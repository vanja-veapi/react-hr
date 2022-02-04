import React from "react";
import "./Nav.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/actions";
const Nav = () => {
	let token = null;
	if (JSON.parse(localStorage.getItem("userData")) !== null) {
		token = JSON.parse(localStorage.getItem("userData")).token;
	}

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleLogoutUser = () => {
		dispatch(logout());
		localStorage.removeItem("userData");
		setTimeout(navigate("/"), 1000);
	};
	return (
		<div className="nav navbar navbar-expand-lg navbar-light bg-primary shadow">
			<p className="ps-3">Logo</p>
			<button className="navbar-toggler collapsed me-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="navbar-collapse collapse justify-content-end" id="navbarSupportedContent">
				<ul className="nav mb-2 mb-lg-0">
					{!token && (
						<>
							<li className="nav-item">
								<NavLink to="/join" className="nav-link">
									Register
								</NavLink>
							</li>

							<li className="nav-item">
								<NavLink to="/" className="nav-link">
									Login
								</NavLink>
							</li>
						</>
					)}
					{token && (
						<>
							<li className="nav-item">
								<NavLink to="/" className="nav-link" onClick={handleLogoutUser}>
									Logout
								</NavLink>
							</li>
						</>
					)}
				</ul>
			</div>
		</div>
	);
};

export default Nav;
