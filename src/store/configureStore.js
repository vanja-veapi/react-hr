import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./rootReducer";
import rootSaga from "../sagas/rootSaga"; //ovde je bio index.js koji je rootSaga

import { persistReducer } from "redux-persist"; // Dodao novo
import storage from "redux-persist/lib/storage"; // Dodao novo

const configureStore = () => {
	const persistConfig = {
		key: "root",
		storage: storage,
	};

	const sagaMiddleware = createSagaMiddleware();
	const persistedReducer = persistReducer(persistConfig, rootReducer); // Dodao novo
	//U create storeu umesto rootReducera dodao persistedReducer
	return {
		...createStore(persistedReducer, applyMiddleware(sagaMiddleware)),
		runSaga: sagaMiddleware.run(rootSaga),
	};
};

export default configureStore;
