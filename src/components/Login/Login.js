import React from "react";
import styles from "./Login.css"
import userIcon from "../../assets/user_icon.png";

const Login = ()=> {
    return (
        <div className="container-form">
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
                <p>Don't have an account?</p>
                <button className="btn">Login</button>
            </div>
        </div>
    )
}
export default Login;