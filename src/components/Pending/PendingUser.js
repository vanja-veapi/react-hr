import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import BasicInfoCard from "../Elements/Cards/BasicInfoCard";
import Loader from "../Loader/Loader";

import "../Elements/Cards/Card.css";
import "./Pending.css";
import Questions from "../Elements/Question/Questions";
import useCompanyQuestions from "../../hooks/questions/useCompanyQuestions";
import useApproveProfile from "../../hooks/profiles/useApproveProfile";
import { useEffect } from "react";
import useRemoveProfile from "../../hooks/profiles/useRemoveProfile";
import { useDispatch } from "react-redux";
import { fetchUserRequest as fetchProfileRequest, setInitalLoading } from "../../store/actions";

const PendingUser = () => {
	const navigate = useNavigate();

	let isLoadedPage = useSelector((state) => state.loadingReducer.loading);
	const profileId = useSelector((state) => state.dataReducer.data.data[0].id);
	const userAnswers = useSelector((state) => state.dataReducer?.data?.data[0]?.attributes.answers?.data);
	let approvedStatusSelector = useSelector((state) => state.dataReducer?.data?.data[0]?.attributes.status);
	const companyQuestions = useCompanyQuestions().data?.data?.data;

	const params = useParams();
	const dispatch = useDispatch();

	const { mutate: approveProfile } = useApproveProfile();
	const { mutate: removeProfile } = useRemoveProfile();

	const handleApproveProfile = () => {
		approveProfile(profileId);
		dispatch(setInitalLoading(true));
		setTimeout(() => dispatch(fetchProfileRequest(params.pendingId, "company_admin")), 1000);
		console.log("Uspesno ste approvovali korisnika");
	};

	const handleRemoveProfile = () => {
		removeProfile(profileId);
		navigate("/team/pending");
	};

	useEffect(() => {
		dispatch(setInitalLoading(true));
		setTimeout(() => dispatch(fetchProfileRequest(params.pendingId, "company_admin")), 1000); //OVO UBACITI U PENDING USER KAD SE KORISNIK APPROVUJE...
	}, [dispatch, params.pendingId]);

	useEffect(() => {
		if (approvedStatusSelector === "published") {
			console.log("Approvoan je korisnik");
			navigate("/team/pending");
		}
	}, [approvedStatusSelector]);
	return (
		<>
			{isLoadedPage && <Loader />}
			<div className="container">
				<div className="row justify-content-around align-items-center mt-3">
					<div className="col-md-12 d-md-flex justify-content-center">
						<h5 className="text-center">Moderate team member entry</h5>
					</div>
					<div className="col-md-8 d-md-flex justify-content-center d-lg-grid btns">
						<button className="w-100 btn btn-primary" id={profileId} onClick={handleApproveProfile}>
							Approve
						</button>
						<button className="w-100 mt-3 mt-md-0 btn btn-danger" id={profileId} onClick={handleRemoveProfile}>
							Delete
						</button>
					</div>
				</div>
				<div className="row justify-content-around mt-4">
					<BasicInfoCard id={params.pendingId} />
					{/* Ovde dalje ide div sa questionom */}
					<div className="col-12 col-md-6">
						<div className="card">
							<div className="card-header">Answers</div>
							<div className="card-body">{companyQuestions?.length === 0 ? <h6>Company has no questions</h6> : <Questions answers={userAnswers} questions={companyQuestions} />}</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default PendingUser;
