import React from "react";
import AllUserQuestions from "./AllUserQuestions";


const UserQuestionsDisplay = () => {
	return (
		<div className="container">

			<div className="row justify-content-around">
				<div className="col-md-10 mt-4">
		
				
				<div className="card">
						<div className="card-body">
                        <AllUserQuestions/>
						</div>
					</div>	
                    <div className="text-right">
                        <button value="Save" className="btn btn-primary mt-3 basic-info text-right">Save</button>
                    </div>
				</div>
			</div>
		</div>
	);
};

export default UserQuestionsDisplay;