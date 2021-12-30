import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import AuthService from "../../services/auth-service";

import { useDispatch } from "react-redux";
import { registerUser } from "../../store/actions";

const Register = () => {
	const regExEmail = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [submitRegister, setSubmitRegister] = useState(false);
	const [state, setState] = useState({
		username: "sbozic",
		email: "stefan.bozic+5@quantox.com",
		password: "qwe123",
		photo: "",
	});
	const onRegister = () => {
		let isSuccessRegister = false;

		if (state.username && state.email && state.password && regExEmail.test(state.email)) {
			isSuccessRegister = true;
			setSubmitRegister(false);
		} else {
			setSubmitRegister(true);
		}

		if (isSuccessRegister) {
			AuthService.register(state).then((response) => {
				if (response !== undefined) {
					dispatch(registerUser(response.data));
					navigate("/");
				}
			});
		}
	};
	return (
		<div className="wrapper d-flex flex-column justify-content-center align-items-center">
			<div className="container container-form">
				<h1>u-Team register</h1>

				<div className="mt-3">
					<label htmlFor="">Username</label>
					{!state.username && submitRegister ? <small className="text-danger">Username is required</small> : ""}
					<input type="text" value={state.username} onChange={(e) => setState({ ...state, username: e.target.value })} placeholder="Name" className="form-control" />
				</div>
				<div className="mt-3">
					<label htmlFor="">Email</label>

					{!state.email && submitRegister ? (
						<small className="text-danger">
							Email is required
							<br />
						</small>
					) : (
						""
					)}
					{!regExEmail.test(state.email) && submitRegister ? <small className="text-danger">Email is not in valid format</small> : ""}

					<input type="text" value={state.email} onChange={(e) => setState({ ...state, email: e.target.value })} placeholder="Email" className="form-control" />
				</div>
				<div className="mt-3">
					<label htmlFor="">Password</label>
					{!state.password && submitRegister ? <small className="text-danger">Password is required</small> : ""}
					<input type="password" value={state.password} onChange={(e) => setState({ ...state, password: e.target.value })} placeholder="Password" className="form-control" />
				</div>
				<div className="mt-3 mb-3">
					<label htmlFor="">Profile photo</label>
					<input type="file" name="" onChange={(e) => setState({ ...state, photo: e.target.value })} placeholder="Profile photo" className="profile-photo-btn form-control" />
				</div>
				<button type="button" className="btn btn-primary float-end" onClick={onRegister}>
					Submit
				</button>
			</div>
		</div>
	);
};

export default Register;
