import React from "react";
import "./Register.css";

const Register = () => {
	return (
		<div className="wrapper d-flex flex-column justify-content-center align-items-center">
			<div className="container container-form">
				<h1>u-Team register</h1>

				<form action="#">
					<div className="mt-3">
						<label htmlFor="">Name</label>
						<input type="text" name="" id="name" placeholder="Name" className="form-control" />
					</div>
					<div className="mt-3">
						<label htmlFor="">Email</label>
						<input type="text" name="" id="email" placeholder="Email" className="form-control" />
					</div>
					<div className="mt-3">
						<label htmlFor="">Password</label>
						<input type="text" name="" id="password" placeholder="Password" className="form-control" />
					</div>
					<div className="mt-3 mb-3">
						<label htmlFor="">Profile photo</label>
						<input type="file" name="" id="profile-photo" placeholder="Profile photo" className="profile-photo-btn form-control" />
					</div>
					<button type="button" className="btn btn-primary float-end">
						Submit
					</button>
				</form>
			</div>
		</div>
	);
};

export default Register;
