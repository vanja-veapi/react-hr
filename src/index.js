import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";

// import store from "./store";
import configureStore from "./store/configureStore";
const store = configureStore();
// store.subscribe(function () {
// 	console.log(store.getState());
// });
ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
			<App />
			</BrowserRouter>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);
