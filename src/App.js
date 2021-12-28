import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import Nav from "./components/Nav/Nav";
import NotFound from "./components/NotFound/NotFound";
import Register from "./components/Register/Register";

function App() {
	return (
		<div className="App">
			<Nav />
			<Routes>
				<Route exact path="/" element={<Login />} />
				<Route path="/join" element={<Register />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</div>
	);
}

export default App;
