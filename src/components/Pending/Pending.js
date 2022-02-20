import React from "react";
import Loader from "../Loader/Loader";
import Card from "../Elements/Cards/Card";
import "./Pending.css";

import usePendingProfiles from "../../hooks/profiles/usePendingProfiles";
const Pending = () => {
	const pendingProfiles = usePendingProfiles();

	const profiles = pendingProfiles?.data?.data?.data;

	return (
		<>
			{pendingProfiles.status === "loading" ? <Loader /> : true}

			<div className="pending container-fluid">
				<h3 className="ms-4 mt-5">Pending for approval</h3>
				<div className="container-fluid">
					<div className="cards row mt-5">
						{profiles?.map((profile) => (
							<Card key={profile.id} id={profile.id} name={profile.attributes.name} status={profile.attributes.status} profilePhoto={profile.attributes.profilePhoto?.data} date={profile.attributes.createdAt} userId={profile.attributes.user.data.id} />
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default Pending;
