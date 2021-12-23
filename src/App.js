import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav/Nav";
import NotFound from "./components/NotFound/NotFound";
import Register from "./components/Register/Register";

function App() {
	return (
		<div className="App">
			<Nav />
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/join" element={<Register />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</div>
	);
}

export default App;
