import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";

const useAuth = () => {
	if (JSON.parse(localStorage.getItem("userData")) !== null) {
		const token = JSON.parse(localStorage.getItem("userData")).token;
		return token;
	}
};

const ProtectedRoutes = () => {
	const isAuth = useAuth();
	return isAuth ? (
		<div className="d-flex">
			<Sidebar />
			<Outlet />
		</div>
	) : (
		// <Navigate to="/" />
		false
	);
};

export default ProtectedRoutes;
