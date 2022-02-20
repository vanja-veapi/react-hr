import React from "react";
import "./Loader.css";

const LoadingComponent = () => {
	document.querySelector("body").classList.add("overflow-hidden");
	setTimeout(() => document.querySelector("body").classList.remove("overflow-hidden"), 3500);
	return (
		<div className="loading">
			<div className="overlay d-flex justify-content-center align-items-center">
				<p>Loading...</p>
			</div>
		</div>
	);
};

export default LoadingComponent;
