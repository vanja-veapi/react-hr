import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import GuestUser from "./components/GuestUser/GuestUser";
import Login from "./components/Login/Login";
import Nav from "./components/Nav/Nav";
import NotFound from "./components/NotFound/NotFound";
import Register from "./components/Register/Register";
import MyProfile from "./components/MyProfile/MyProfile";
import ProtectedRoutes from "./ProtectedRoutes";
import CompanyInfo from "./components/CompanyInfo/CompanyInfo";
import Pending from "./components/Pending/Pending";
// import Sidebar from "./components/Sidebar/Sidebar";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import PendingUser from "./components/Pending/PendingUser";

const queryClient = new QueryClient();
function App() {
	const token = JSON.parse(localStorage.getItem("userData"))?.token;
	// const pendingId = window.location.pathname.split("/");
	// ${pendingId[3]}
	// console.log(pendingId);

	if (token !== undefined && (window.location.pathname === "/" || window.location.pathname === "/join")) {
		// Sigurno postoji bolji nacin
		console.log(token);
		window.location.replace("/my-profile");
	}
	return (
		<QueryClientProvider client={queryClient}>
			<div className="App">
				<Nav />
				{/* <Sidebar /> */}
				<Routes>
					<Route exact path="/" element={<Login />} />
					<Route path="/join" element={<Register />} />

					<Route element={<ProtectedRoutes />}>
						<Route path="/my-profile" element={<MyProfile />} />
						<Route path="/company-info" element={<CompanyInfo />} />
						<Route path="/team/pending" element={<Pending />} />
						<Route exact path={`/team/pending/:pendingId/edit`} element={<PendingUser />} />
					</Route>

					<Route path="/slug" element={<GuestUser />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</div>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}

export default App;
