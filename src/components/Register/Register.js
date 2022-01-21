import React, { useState, useEffect } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import { registerUser, setInitalLoading, requestAllCompany } from "../../store/actions";
import { FaUndo } from "react-icons/fa";
import { AiOutlineCheck } from "react-icons/ai";
import Loader from "../Loader/Loader";

const Register = (props) => {
	// console.log(props.state.registerReducer.response);
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
			if (props.state.registerReducer.response.data.error.details?.errors === undefined) {
				info.push(props.state.registerReducer.response.data.error.message);
			} else {
				let objects = props.state.registerReducer.response.data.error.details.errors;

				objects.forEach((obj) => {
					info.push(obj.message);
					console.log(info);
				});
			}
		}
	}

	const regExEmail = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;

	const [submitRegister, setSubmitRegister] = useState(false);
	const [state, setState] = useState({
		username: "vanja",
		email: "vv01@quantox.com",
		password: "qwe123",
		photo: null,
	});
	const [isDropdown, setIsDropdown] = useState(true);
	const handleIsLoadedToggle = () => {
		dispatch(setInitalLoading(!isLoadedProp));
	};
	const handleAddField = (e) => {
		e.target.value === "other" ? setIsDropdown(false) : setIsDropdown(true);
	};
	const handleFileChange = (e) => {
		const fileUploaded = e.target.files[0];

		const imageData = new FormData();
		imageData.append("files", fileUploaded);

		setState({ ...state, photo: imageData });
	};
	const onRegister = () => {
		let isSuccessRegister = false;

		if (state.username && state.email && state.password && regExEmail.test(state.email) && state.photo !== null) {
			isSuccessRegister = true;
			setSubmitRegister(false);
		} else {
			setSubmitRegister(true);
		}

		if (isSuccessRegister) {
			handleIsLoadedToggle();
			console.log(state);
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
					{state.photo === null && submitRegister ? <small className="text-danger">Files are empty</small> : ""}
					<input type="file" name="" onChange={(e) => handleFileChange(e)} placeholder="Profile photo" className="profile-photo-btn form-control" />
				</div>
				<div className="mt-3 mb-3 d-flex role-container">
					<label>User</label>
					<input type="radio" name="rold" className="ms-1 role" value={"company_user"} defaultChecked />
					<label className="ms-4">Admin</label>
					<input type="radio" name="rold" className="ms-1 role" value={"company_admin"} />
				</div>
				<div className="companies-container">
					<select id="companies" className={isDropdown ? "form-select mb-3" : "d-none"} onChange={handleAddField}>
						{companies !== undefined &&
							companies.map((company) => {
								return (
									<option key={company.id} value={company.id}>
										{company.attributes.name}
									</option>
								);
							})}
						{/* Ako je defaultValue nece se okine other */}
						<option value="other">Other...</option>
					</select>
					<div className={isDropdown ? "d-none" : "d-block company-input position-relative"}>
						<input type="text" className="form-control" placeholder="Add new company..." />
						<div className="fa-icons position-absolute">
							<AiOutlineCheck className="icon text-primary me-3" />
							<FaUndo className="icon text-primary" onClick={handleAddField} />
						</div>
					</div>
				</div>

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
