import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";

// import store from "./store";
import configureStore from "./store/configureStore";

// Persistor
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
const store = configureStore();
// store.subscribe(function () {
// 	console.log(store.getState());
// });
const persistor = persistStore(store);

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</PersistGate>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);
