import React from "react";

const Questions = (props) => {
	const answers = props.answers;
	console.log(answers);
	return (
		<div className="questions">
			{answers.map((answer, i) => {
				return (
					<div key={answer.id} className="question mt-3">
						<h6>Question {i}</h6>
						<p className="form-control mt-3">{answer.attributes.answer}</p>
					</div>
				);
			})}
		</div>
	);
};
export default Questions;

{
	/* <div className="question mt-3">
				<h6>Question 1 - Do you have a pet</h6>
				<p className="form-control mt-3">Yes, I have a dog, his name is Milutin</p>
			</div>
			<div className="question mt-3">
				<h6>Question 2 - Which city do you Live in</h6>
				<p className="form-control mt-3">Novi Sad</p>
			</div> */
}
