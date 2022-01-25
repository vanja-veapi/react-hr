import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import GuestUser from "./components/GuestUser/GuestUser";
import Login from "./components/Login/Login";
import Nav from "./components/Nav/Nav";
import NotFound from "./components/NotFound/NotFound";
import Register from "./components/Register/Register";
import Sidebar from "./components/Sidebar/Sidebar"
function App() {
	return (
		<div className="App">
			
			<Nav />
			<Sidebar/>
			<Routes>
				<Route exact path="/" element={<Login />} />
				<Route path="/join" element={<Register />} />
				<Route path="/slug" element={<GuestUser />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</div>
	);
}

export default App;
