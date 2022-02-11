import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

import { useComapnyData, useEditCompanyData } from "../../hooks/useCompanyData";
import Loader from "../Loader/Loader";
import noImage from "../../assets/no-logo.jpeg";
const CompanyInfo = () => {
	//58 = id (Dnevnjak)
	const { isLoading, data, isError, error } = useComapnyData();
	const { mutate: editCompany } = useEditCompanyData();

	const slug = data?.data?.data.attributes.slug;
	const name = data?.data?.data.attributes.name;
	const logo = data?.data?.data.attributes.logo?.data;
	console.log(logo);
	//Edit company query
	const [statusCode, setStatusCode] = useState(data?.status);
	const responseMessage = data?.message;

	const initState = logo === undefined ? null : logo;

	const [company, setCompany] = useState(name);
	const [message, setMessage] = useState(responseMessage);
	const [cssClass, setCssClass] = useState("");
	const [isSubmited, setIsSubmited] = useState(false);
	const [isWrongFormat, setIsWrongFormat] = useState(false);
	const [isFileSubmited, setIsFileSubmited] = useState(false);
	//Image is const for passing to the reactQuery
	const [image, setNewImage] = useState(initState);
	//Logo img is const for render in HTML
	const [logoImg, setLogoImg] = useState(logo);

	useEffect(() => {
		setNewImage(initState);
	}, [initState]);

	useEffect(() => {
		setCompany(name);
	}, [setCompany, name]);

	useEffect(() => {
		setStatusCode(data?.status);
	}, [setStatusCode, data?.status]);

	useEffect(() => {
		setLogoImg(logo);
	}, [setLogoImg, logo]);

	useEffect(() => {
		if (statusCode === 200) {
			setCssClass("alert-success");
			setMessage("You have successfully edited your company data");
			setTimeout(() => setCssClass("d-none"), 5000);
		} else {
			setMessage(responseMessage);
			setCssClass("alert-danger");
			setTimeout(() => setCssClass("d-none"), 4000);
		}
	}, [statusCode, responseMessage]);
	if (isError) {
		return <p className="h6 offset-2 mt-3">{error.message}</p>;
	}

	const isEmptyOrSpaces = (str) => {
		return str === null || str.match(/^ *$/) !== null;
	};

	const handleFileChange = (e) => {
		const fileUploaded = e.target.files[0];
		const imageTypes = ["image/jpeg", "image/png", "image/gif"];

		//Check if someone want to upload wrong format
		if (!imageTypes.some((type) => fileUploaded.type === type)) {
			return setIsWrongFormat(true);
		}
		setIsWrongFormat(false);

		const imageData = new FormData();
		imageData.append("files", fileUploaded);
		setNewImage(imageData);
		setIsFileSubmited(true);
	};

	const handleEditCompany = () => {
		setIsSubmited(true);
		if (isEmptyOrSpaces(company)) {
			setCssClass("alert-danger");
			setMessage("Field cannot be empty!");
			return setTimeout(() => setCssClass("d-none"), 3000);
		}
		if (isWrongFormat) {
			setCssClass("alert-danger");
			setMessage("Document is not in valid format!");
			return setTimeout(() => setCssClass("d-none"), 3000);
		}
		editCompany({ name: company, image, isFileSubmited });
		setIsFileSubmited(false);
	};
	return (
		<>
			{isLoading && <Loader />}
			<div className="container">
				<div className="row justify-content-around">
					<div className="col-md-9 mt-4">
						<div className="card">
							<div className="card-header">Company Info</div>
							<div className="card-body">
								<p className="text-muted">Slug: {slug}</p>
								<div className="form-group mt-2">
									<label className="h6">Company Name</label>
									<input type="text" className="form-control" value={company} placeholder="Edit company..." onChange={(e) => setCompany(e.target.value)} />
								</div>
								<div className="form-group mt-2">
									<label className="h6">Company logo</label>
									<input type="file" className="form-control mb-3" onChange={(e) => handleFileChange(e)} />
								</div>
							</div>
							<div className={!isSubmited ? `d-none` : `alert ${cssClass} mx-3`} role="alert">
								{message}
							</div>
							<input type="button" value="Save" className="btn btn-primary mt-3 basic-info" onClick={handleEditCompany} />
							{/* onChange={(e) => handleFileChange(e)}  */}
						</div>
					</div>
					<div className="col-md-3 mt-4 d-flex justify-content-end align-items-baseline">
						{isLoading && <div className="dot-pulse"></div>}
						{/* {user?.profilePhoto?.data === null || user?.profilePhoto?.data === undefined ? <img src={noImage} alt="User has no img" width="200" className="img-fluid" /> : <img src={user?.profilePhoto.data.attributes.url} alt={user?.profilePhoto.data.attributes.name} className="img-fluid" width={200} />} */}
						{logoImg?.attributes === null || logoImg?.attributes === undefined ? <img src={noImage} alt="Comapny has no img..." className="img-fluid DESIO SE OVAJ DIV" width={150} /> : <img src={logoImg.attributes?.url} alt={logoImg.attributes?.name} className="img-fluid DESIO SE DRUGI DIV" width={150} />}
					</div>
				</div>
			</div>
		</>
	);
};

export default CompanyInfo;
