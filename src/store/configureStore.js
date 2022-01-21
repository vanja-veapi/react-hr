import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./rootReducer";
import rootSaga from "../sagas/rootSaga"; //ovde je bio index.js koji je rootSaga

const configureStore = () => {
	const sagaMiddleware = createSagaMiddleware();

	return {
		...createStore(rootReducer, applyMiddleware(sagaMiddleware)),
		runSaga: sagaMiddleware.run(rootSaga),
	};
};

export default configureStore;
