import React, { useState, useEffect } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import { registerUser, setInitalLoading, requestAllCompany } from "../../store/actions";

import Loader from "../Loader/Loader";

const Register = (props) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	//Props = Data stored in redux.store
	useEffect(() => {
		dispatch(requestAllCompany());
	}, [dispatch]);

	const companies = props.companies.data?.data;
	const statusCodeProp = props.state.registerReducer.response === undefined ? 0 : props.state.registerReducer.response.status;

	let isLoadedProp = props.state.loadingReducer.loading === undefined ? false : props.state.loadingReducer.loading;

	const info = [];
	let cssClass = "";
	if (statusCodeProp === 200) {
		info.push("You have successfully registered.");
		cssClass = "alert-success";
	} else if (props.state.registerReducer.response !== undefined) {
		if (props.state.registerReducer.response.status >= 400) {
			cssClass = "alert-danger";
			if (props.state.registerReducer.response.data.error.details.errors === undefined) {
				info.push(props.state.registerReducer.response.data.error.message);
			} else {
				let objects = props.state.registerReducer.response.data.error.details.errors;

				objects.forEach((obj) => {
					info.push(obj.message);
				});
			}
		}
	}

	const regExEmail = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;

	const [submitRegister, setSubmitRegister] = useState(false);
	const [state, setState] = useState({
		username: "sbozic",
		email: "stefan.bozic+5@quantox.com",
		password: "qwe123",
		photo: "",
	});

	const handleIsLoadedToggle = () => {
		dispatch(setInitalLoading(!isLoadedProp));
	};
	const onRegister = () => {
		let isSuccessRegister = false;

		if (state.username && state.email && state.password && regExEmail.test(state.email)) {
			isSuccessRegister = true;
			setSubmitRegister(false);
		} else {
			setSubmitRegister(true);
		}

		if (isSuccessRegister) {
			handleIsLoadedToggle();
			dispatch(registerUser(state));
		}
	};
	return (
		<div className="wrapper d-flex flex-column justify-content-center align-items-center">
			{/* {statusCodeProp === 200 ? setTimeout(() => navigate("/"), 1500) : false} */}
			{isLoadedProp && <Loader />}
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

				<select id="companies" className="form-select mb-3">
					{companies !== undefined &&
						companies.map((company) => {
							return (
								<option key={company.id} value={company.id}>
									{company.attributes.name}
								</option>
							);
						})}
					<option id="other">Other...</option>
				</select>

				{/* Alert box */}
				<div className={info.length === 0 ? `d-none alert ${cssClass}` : `alert ${cssClass}`}>
					{info.map((message, index) => (
						<p className="card-text" key={index}>
							{message}
						</p>
					))}
				</div>
				<button type="button" className="btn btn-primary float-end" onClick={onRegister}>
					Submit
				</button>
			</div>
		</div>
	);
};
const mapState = (state) => {
	return {
		state,
		companies: state.companyReducer,
	};
};
export default connect(mapState)(Register);
