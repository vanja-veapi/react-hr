import React from "react";
import "./Nav.css";
import { Link, NavLink } from "react-router-dom";

const Nav = () => {
	return (
		<div className="nav navbar navbar-expand-lg navbar-light bg-primary shadow">
			<p className="ps-3">Logo</p>
			<button className="navbar-toggler collapsed me-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="navbar-collapse collapse justify-content-end" id="navbarSupportedContent">
				<ul className="nav mb-2 mb-lg-0">
					<li className="nav-item">
						<NavLink to="/join" className="nav-link">
							Register
						</NavLink>
					</li>

					<li className="nav-item">
						<NavLink to="/login" className="nav-link">
							Login
						</NavLink>
					</li>

					{/* <li className="p-3">Page 3</li> */}
				</ul>
			</div>
		</div>
	);
};

export default Nav;
