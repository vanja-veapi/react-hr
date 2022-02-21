import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import SidebarUser from "../components/Sidebar/SidebarUser";
import SidebarMenu from "../components/Sidebar/Sidebar";

const useAuth = () => {
	if (JSON.parse(localStorage.getItem("userData")) !== null) {
		const token = JSON.parse(localStorage.getItem("userData")).token;
		return token;
	}
};

const ProtectedRoutes = () => {
	const isAuth = useAuth();
	const userRole = localStorage.getItem("role");
	console.log("Rola iz Protet", userRole);
	return (isAuth? userRole === 'company_user'? (<div className="d-flex">
		<SidebarUser/>
		<Outlet/>
	</div>): userRole === 'company_admin'? (<div className="d-flex">
		<SidebarMenu/>
		<Outlet/>
	</div>): (<Outlet/>):(<Navigate to="/"/>))
}



export default ProtectedRoutes;
