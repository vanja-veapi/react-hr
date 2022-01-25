import React from "react";
import { NavLink } from "react-router-dom";
import userIcon from "../../assets/user_icon.png";
import Register from "../Register/Register";
import "./Login.css";

const Login = () => {
	return (
		<div className="wrapper d-flex flex-column justify-content-center align-items-center">
			<div className=" container container-form">
				<h1 className="text-center">uTeam - Login</h1>
				<div className="text-center">
					<img src={userIcon} alt="user_icon.png" />
				</div>
				<div className="login-form">
					<label htmlFor="email">Email</label>
					<input type="text" name="email" placeholder="Email"></input>
					<label htmlFor="password">Password</label>
					<input type="text" name="password" placeholder="Password"></input>
				</div>
				<div className="login-bottom">
					<NavLink to="/join" element={<Register />}>
						Don't have an account?
					</NavLink>
					<button className="btn">Login</button>
				</div>
			</div>
		</div>
	);
};
export default Login;
