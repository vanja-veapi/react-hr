import React from "react";
import { Link, NavLink } from "react-router-dom";

const Nav = () => {
	return (
		<div className="nav navbar bg-primary text-white shadow">
			<h1 className="ps-3">Logo</h1>
			<ul className="nav">
				<li>
					<NavLink to="/register" className="nav-link">
						Register
					</NavLink>
				</li>

				<li>
					<NavLink to="/login" className="nav-link">
						Login
					</NavLink>
				</li>

				{/* <li className="p-3">Page 3</li> */}
			</ul>
		</div>
	);
};

export default Nav;
