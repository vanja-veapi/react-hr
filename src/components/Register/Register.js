import React, { useState, useEffect } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import { registerUser, setInitalLoading, requestAllCompany } from "../../store/actions";
import { FaUndo } from "react-icons/fa";
import Loader from "../Loader/Loader";

const Register = (props) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(requestAllCompany());
	}, [dispatch]);

	const companies = props.companies?.data?.data;
	const statusCode = props.state.authReducer.response === undefined ? 0 : props.state.authReducer.response.status;

	let isLoadedProp = props.state.loadingReducer.loading === undefined ? false : props.state.loadingReducer.loading;

	const info = [];
	let cssClass = "";
	if (statusCode === 200) {
		info.push("You have successfully registered.");
		cssClass = "alert-success";
	} else if (props.state.authReducer.response !== undefined) {
		if (statusCode >= 400) {
			cssClass = "alert-danger";

			// .details?.errors
			if (props.state.authReducer?.response?.data?.error?.details?.errors === undefined) {
				// console.log(props.state.registerReducer.response.data.error.message); //Ovako mi vraca za createNewCompany;
				info.push(props.state.authReducer.response.data.error.message);

				// info.push(props.state.registerReducer.response.details.data.error.message)
				// if (props.state.registerReducer.response.status === 400) {
				// 	info.push(props.state.registerReducer.response.data.error.message);
				// } else {
				// 	info.push(props.state.registerReducer.response.statusText);
				// }
			} else {
				let objects = props.state.authReducer.response.data.error.details.errors;

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
		username: "",
		email: "",
		password: "",
		photo: null,
		role: "company_user",
		newCompany: "",
	});
	const [isDropdown, setIsDropdown] = useState(true);
	const [isWrongFormat, setIsWrongFormat] = useState(false);

	const handleIsLoadedToggle = () => {
		dispatch(setInitalLoading(!isLoadedProp));
	};
	const handleAddField = (e) => {
		setState({ ...state, newCompany: e.target.value });

		if (e.target.value === "other") {
			e.target.value = "";
			setIsDropdown(false);
		} else {
			setIsDropdown(true);
		}
	};
	const handleFileChange = (e) => {
		const fileUploaded = e.target.files[0];
		const imageTypes = ["image/jpeg", "image/png", "image/gif"];

		//Check if someone want to upload wrong format
		if (!imageTypes.some((type) => fileUploaded.type === type) && fileUploaded !== null) {
			return setIsWrongFormat(true);
		}
		setIsWrongFormat(false);

		const imageData = new FormData();
		imageData.append("files", fileUploaded);
		setState({ ...state, photo: imageData });
	};
	const onRegister = () => {
		let isSuccessRegister = false;

		if (state.username && state.email && state.password && regExEmail.test(state.email) && (state.newCompany !== "" || state.newCompany !== "other") && !isWrongFormat) {
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
			{/* {statusCode === 200 ? setTimeout(() => navigate("/my-profile"), 1500) : false} */}
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
					{isWrongFormat && submitRegister ? <small className="text-danger">Wrong format, only image!</small> : ""}
					<input type="file" name="" onChange={(e) => handleFileChange(e)} placeholder="Profile photo" className="profile-photo-btn form-control" />
				</div>
				<div className="mt-3 mb-3 d-flex role-container">
					<label>User</label>
					<input type="radio" name="role" className="ms-1 role" value={"company_user"} onChange={(e) => setState({ ...state, role: e.target.value })} defaultChecked />
					<label className="ms-4">Admin</label>
					<input type="radio" name="role" className="ms-1 role" value={"company_admin"} onChange={(e) => setState({ ...state, role: e.target.value })} />
				</div>
				<div className="companies-container">
					{(state.newCompany === "" || state.newCompany === "other") && submitRegister ? <small className="text-danger">You can't add an empty company</small> : ""}
					<select
						id="companies"
						className={isDropdown ? "form-select mb-3" : "d-none"}
						onChange={(e) => {
							handleAddField(e);
						}}
					>
						<option value="" selected disabled>
							Choose company
						</option>
						{companies !== undefined &&
							companies.map((company) => {
								return (
									<option key={company.id} value={company.id}>
										{company.attributes.name}
									</option>
								);
							})}
						{/* Ako je defaultValue nece se okine other */}
						<option value="other">Create company</option>
					</select>
					<div className={isDropdown ? "d-none" : "d-block"}>
						{/* pvde */}
						<div className="company-input position-relative">
							<input type="text" className="form-control" placeholder="Add new company..." onChange={(e) => setState({ ...state, newCompany: e.target.value })} />
							<div className="fa-icons position-absolute">
								<FaUndo className="icon text-primary" onClick={handleAddField} title="Go back" />
							</div>
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
		companies: state.dataReducer,
	};
};
export default connect(mapState)(Register);
