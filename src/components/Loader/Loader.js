import React from "react";
import "./Loader.css";

const LoadingComponent = () => {
	return (
		<div className="loading">
			<div className="overlay d-flex justify-content-center align-items-center">
				<p>Loading...</p>
			</div>
		</div>
	);
};

export default LoadingComponent;
