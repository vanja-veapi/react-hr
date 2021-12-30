import React from "react";
import "./GuestUser.css";
import { FiSearch } from "react-icons/fi";
const GuestUser = () => {
	return (
		<div className="container mt-5">
			<div className="container-header d-block d-lg-flex justify-content-between align-items-center">
				<div className="team-info d-flex align-items-center">
					<img src="https://www.helloworld.rs/public/files/_thumb/200x200/public/company/337/2/quantox%20vertical.png" alt="Quantox" width={81} />
					<h6>Quantox Team</h6>
				</div>
				<div className="functions d-block d-lg-flex justify-content-around">
					<div className="filter position-relative me-lg-4 mb-3 mb-lg-0">
						<FiSearch className="icons position-absolute" />
						<input type="text" className="filter-input form-control" placeholder="Filter by name" />
					</div>
					<div className="sort position-relative">
						<select className="form-select">
							<option value="Inital sort" defaultValue>
								Last joined
							</option>
							<option value="Asc">ASC</option>
							<option value="Desc">DESC</option>
						</select>
					</div>
				</div>
			</div>

			<div className="container-users">
				<div className="card">
					<img src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?size=626&ext=jpg" alt="" className="img-fluid" />
					<p>Pera Peric</p>
				</div>
				<div className="card">
					<img src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?size=626&ext=jpg" alt="" className="img-fluid" />
					<p>Pera Peric</p>
				</div>
				<div className="card">
					<img src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?size=626&ext=jpg" alt="" className="img-fluid" />
					<p>Pera Peric</p>
				</div>
				<div className="card">
					<img src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?size=626&ext=jpg" alt="" className="img-fluid" />
					<p>Pera Peric</p>
				</div>
				<div className="card">
					<img src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?size=626&ext=jpg" alt="" className="img-fluid" />
					<p>Pera Peric</p>
				</div>
				<div className="card">
					<img src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?size=626&ext=jpg" alt="" className="img-fluid" />
					<p>Pera Peric</p>
				</div>
			</div>
		</div>
	);
};

export default GuestUser;
