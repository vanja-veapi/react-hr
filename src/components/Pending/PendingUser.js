import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import BasicInfoCard from "../Elements/Cards/BasicInfoCard";
import Loader from "../Loader/Loader";

import "../Elements/Cards/Card.css";
import "./Pending.css";
import Questions from "../Elements/Question/Questions";
const PendingUser = () => {
	let isLoadedPage = useSelector((state) => state.loadingReducer.loading);
	const answers = useSelector((state) => state.dataReducer?.data?.data[0]?.attributes.answers?.data);
	const params = useParams();
	return (
		<>
			{isLoadedPage && <Loader />}
			<div className="container">
				<div className="row justify-content-around align-items-center mt-3">
					<div className="col-md-12 d-md-flex justify-content-center">
						<h5 className="text-center">Moderate team member entry</h5>
					</div>
					<div className="col-md-8 d-md-flex justify-content-center d-lg-grid btns">
						<button className="w-100 btn btn-primary">Approve</button>
						<button className="w-100 mt-3 mt-md-0 btn btn-danger">Delete</button>
					</div>
				</div>
				<div className="row justify-content-around mt-4">
					<BasicInfoCard id={params.pendingId} />
					{/* Ovde dalje ide div sa questionom */}
					<div className="col-12 col-md-6">
						<div className="card">
							<div className="card-header">Answers</div>
							<div className="card-body">{answers.length === 0 ? <h6>User has no answer</h6> : <Questions answers={answers} />}</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default PendingUser;
