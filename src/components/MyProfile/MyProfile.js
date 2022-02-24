import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserRequest as fetchProfileRequest, editUserRequest, setInitalLoading } from "../../store/actions";

import noImage from "../../assets/no-image.png";
import Loader from "../Loader/Loader";
const MyProfile = () => {
	const id = JSON.parse(localStorage.getItem("userData")).id;
	let isLoadedPage = useSelector((state) => state.loadingReducer.loading);

	const status = useSelector((state) => state.dataReducer.status);
	const userObject = useSelector((state) => state.dataReducer?.data?.data[0]?.attributes); //User Data
	const profileId = useSelector((state) => state.dataReducer.data?.data[0]?.id);
	const imageId = useSelector((state) => state.dataReducer.data?.data[0]?.attributes?.profilePhoto?.data?.id);
	const companyId = useSelector((state) => state.dataReducer.data?.data[0]?.attributes?.company.data?.id);

	if (companyId !== undefined) {
		localStorage.setItem("companyId", companyId);
	}

	const [user, setUser] = useState(userObject);
	const [newImage, setNewImage] = useState(null);
	const [isWrongFormat, setIsWrongFormat] = useState(false);

	const dispatch = useDispatch();
	// useEffect(() => {
	// 	if (userObject) {
	// 		dispatch(fetchProfileRequest(userObject.user.data.id));
	// 		console.log("User object useeffect");
	// 		console.log(2);
	// 	}
	// }, [userObject.user.data.id]);
	// [dispatch, id];
	//Umesto dispatch i id, staviti object
	// Ako stavim object u dependeci array, upadam u infiniti loop
	useEffect(() => {
		dispatch(setInitalLoading(true));
		setTimeout(() => dispatch(fetchProfileRequest(id)), 4000); //Interval je 4sekunde da bi se prihatila i slika
	}, [dispatch, id]);

	useEffect(() => {
		setUser(userObject);
		console.log(1);
	}, [setUser, userObject]);

	const handleEdit = (e) => {
		//Ona mi je bitna da bih mogao da usmerim funkciju da l je izmena u username ili passworda
		const className = e.target.classList[3];

		if (className === "basic-info") {
			const userName = user.name;

			if (isEmptyOrSpaces(userName) || isWrongFormat) {
				return alert("Ubaciti popup ovde");
			}

			dispatch(editUserRequest({ name: userName, profileId: profileId, newImageData: newImage, imageId: imageId }));
		} else if (className === "password") {
			console.log("pw");
		}
	};

	const handleFileChange = (e) => {
		const fileUploaded = e.target.files[0];
		const imageTypes = ["image/jpeg", "image/png", "image/gif"];

		//Check if someone want to upload wrong format
		if (!imageTypes.some((type) => fileUploaded.type === type)) {
			setIsWrongFormat(true);
			return alert("You cannot upload video or other document, only picture");
		}
		setIsWrongFormat(false);

		const imageData = new FormData();
		imageData.append("files", fileUploaded);
		setNewImage(imageData);
	};
	const isEmptyOrSpaces = (str) => {
		return str === null || str.match(/^ *$/) !== null;
	};
	return (
		<>
			{isLoadedPage && <Loader />}
			<div className="container">
				<div className="row justify-content-around">
					<div className="col-md-6 mt-4">
						<div className="card">
							<div className="card-header">Basic info</div>
							<div className="card-body">
								<div className="form-group mt-2">
									<label className="h6">Username</label>
									<input type="text" className="form-control" value={user !== undefined ? user.name : ""} onChange={(e) => setUser({ ...user, name: e.target.value })} />
								</div>
								<div className="form-group mt-2">
									<label className="h6">Profile photo</label>
									<input type="file" className="form-control mb-3" onChange={(e) => handleFileChange(e)} />
									{user?.profilePhoto?.data === null || user?.profilePhoto?.data === undefined ? <img src={noImage} alt="User has no img" width="200" className="img-fluid" /> : <img src={user?.profilePhoto.data.attributes.url} alt={user?.profilePhoto.data.attributes.name} className="img-fluid" width={200} />}
								</div>
							</div>
							<input type="button" value="Save" className="btn btn-primary mt-3 basic-info" onClick={handleEdit} />
						</div>
					</div>
					<div className="col-md-6 mt-4">
						<div className="card">
							<div className="card-header">Security</div>
							<div className="card-body">
								<p>{user !== undefined ? user.user?.data?.attributes.email : ""}</p>
								<div className="form-group mt-2">
									<label className="h6">Current password</label>
									<input type="password" className="form-control" />
								</div>
								<div className="form-group mt-2">
									<label className="h6">New password</label>
									<input type="password" className="form-control" />
								</div>
							</div>
							<input type="button" value="Save" className="btn btn-primary mt-3 password" onClick={handleEdit} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default MyProfile;
