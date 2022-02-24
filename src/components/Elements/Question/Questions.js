import React from "react";

const Questions = (props) => {
	const answers = props.answers;
	const odgovori = ["IMT", "Crvene", "Novi Beograd"];
	const questions = props.questions;

	return (
		<div className="questions">
			{questions?.map((question, i) => {
				return (
					<div key={question.id} className="question mt-3">
						<h6>{question?.attributes.text}</h6>
						<p className="form-control mt-3">- {odgovori[i]}</p>
					</div>
				);
			})}
		</div>
	);
};
export default Questions;
