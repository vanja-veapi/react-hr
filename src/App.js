import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import GuestUser from "./components/GuestUser/GuestUser";
import Login from "./components/Login/Login";
import Nav from "./components/Nav/Nav";
import NotFound from "./components/NotFound/NotFound";
import Register from "./components/Register/Register";
import MyProfile from "./components/MyProfile/MyProfile";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import CompanyInfo from "./components/CompanyInfo/CompanyInfo";
import UserQuestionsDisplay from "./components/Questions/UserQuestions/UserQuestionsDisplay";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import AdminQuestionsDisplay from "./components/Questions/AdminQuestions/AdminQuestionsDisplay";
import AdminAddQuestion from "./components/Questions/AdminQuestions/AdminAddQuestion";
import AdminEditQuestion from "./components/Questions/AdminQuestions/AdminEditQuestion";
import { useSelector } from "react-redux";


const queryClient = new QueryClient();

function App() {
	const token = JSON.parse(localStorage.getItem("userData"))?.token;
	if (token !== undefined && (window.location.pathname === "/" || window.location.pathname === "/join")) {
		// Sigurno postoji bolji nacin
		console.log(token);
		window.location.replace("/my-profile");
	}
	
	
	let userRole = useSelector((state) => state.dataReducer?.data?.data[0]?.attributes.userRole);
	if(!userRole){
		userRole = localStorage.getItem("role");
	}
	
	
	console.log("Rola iz App", userRole);

	
	
	return (
		<QueryClientProvider client={queryClient}>
			<div className="App">
				<Nav />
				<Routes>
						<Route exact path="/" element={<Login />} />
						<Route path="/join" element={<Register />} />
						<Route path="/slug" element={<GuestUser />} />
						<Route path="*" element={<NotFound />} />
					<Route element = {<ProtectedRoutes/>}>
						{/*User route*/}
						<Route path="/questions" element={ userRole === 'company_user'?(<UserQuestionsDisplay />) : (<Navigate to="*"/>)} />
						<Route path="/my-profile" element={<MyProfile />} />
						<Route path="*" element={<NotFound/>}/>
					{/*Admin route */}
						<Route path="/questions-admin" element={ userRole === 'company_admin'? (<AdminQuestionsDisplay />) : (<Navigate to="*"/>)} />
						<Route path="/company-info" element={userRole === 'company_admin'? (<CompanyInfo />) : (<Navigate to="*"/>)} />
						<Route path="/new-question" element={userRole === 'company_admin'? (<AdminAddQuestion />) : (<Navigate to="*"/>)} />
						<Route path="/edit-question" element={userRole === 'company_admin'? (<AdminEditQuestion />) : (<Navigate to="*"/>)} />
						<Route path="/my-profile" element={<MyProfile />} />
						<Route path="*" element={<NotFound/>}/>
					</Route>
				</Routes>

			</div>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}

export default App;
