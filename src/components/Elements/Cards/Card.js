import React, { useState } from "react";
import "./Card.css";

import NoImage from "../../../assets/no-image.png";

import { BsTrash } from "react-icons/bs";
import { FcViewDetails } from "react-icons/fc";
import { Link } from "react-router-dom";

import useRemoveProfile from "../../../hooks/profiles/useRemoveProfile";
const Card = (props) => {
	const date = new Date(props.date);

	const getOrdinal = (n) => {
		return n + (n > 0 ? ["th", "st", "nd", "rd"][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : "");
	};

	const ordinalDate = getOrdinal(date.toLocaleString("default", { day: "numeric" }));
	const pendingLink = `/team/pending/${props.userId}/edit`;
	return (
		<div className="card col-md-10 mb-md-3 col-lg-4 m-lg-3 mb-3">
			<div className="overflow-hidden pending-img">
				<img src={props?.profilePhoto === null ? NoImage : props?.profilePhoto?.attributes?.url} alt={props?.profilePhoto === null ? "No description" : props?.profilePhoto?.attributes?.name} className="card-img-top" />
			</div>
			<div className="card-body">
				<div className="card-content d-flex flex-wrap flex-md-nowrap align-items-center justify-content-around">
					<div className="card-left">
						<h5 className="card-title">{props.name}</h5>
						<p className="card-text text-muted">
							<small>
								Joined {date.toLocaleString("default", { month: "short" })} {ordinalDate}, {date.getFullYear()}
							</small>
						</p>
					</div>
					<div className="card-right mt-3 mt-md-0">
						<div className="pending btn btn-warning text-white">{props.status}</div>
					</div>
				</div>
				<div className="card-buttons my-3 mx-4">
					<div className="row d-lg-grid">
						<Link to={pendingLink} id={props.userId} className="font-button btn btn-primary col-md-12">
							Details <FcViewDetails className="d-none d-sm-inline-block" />
						</Link>
						<button id={props.id} onClick={useRemoveProfile} className="font-button btn btn-danger col-md-12">
							Delete <BsTrash className="d-none d-sm-inline-block" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
