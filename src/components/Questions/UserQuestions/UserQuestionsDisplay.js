import React from "react";
import Loader from "../../Loader/Loader";
import useCompanyQuestions from '../../../hooks/questions/useCompanyQuestions';
import axios from "axios";




const UserQuestionsDisplay = () => {

	

	const Questions = useCompanyQuestions();

	if (Questions.status === 'loading') {
		return <div><Loader /></div>
	}
	if (Questions.status === 'error') {
		return <div>Error...</div>
	}

	const userId = JSON.parse(localStorage.getItem("userData")).id;
	

	let data = {};
		

	const getAnswer = (e) => {
		data[e.target.name] = e.target.value;
	}
	
	const setAnswer = async () => {
		
		let collection = document.getElementsByClassName("form-control");

		for (let i = 0; i < collection.length; i++) {
            if(collection[i].value == ""){
				alert("Please answer all questions");
				return;
			}
        }
		for (const [key, value] of Object.entries(data)) {
			
			data = {data: {answer:`${value}`,question:`${key}`,profile: userId}}
			
			 await axios.post(`${process.env.REACT_APP_BASEURL}/api/answers`,data).then(()=>{
				
			console.log("Uspesno odgovori tekst");
			
			});
		  }
		  
	}
	

	const getImage = async (e) => {
		const image = e.target.files[0];
		const formData = new FormData();
		formData.append("files", image);
		

		const response = await axios.post(`${process.env.REACT_APP_BASEURL}/api/upload`, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			}
		}).then( async (res)=> {
			console.log("Uspesno ubacena slika");
			const answerImg = res.data[0].formats.thumbnail.url;
			await axios.post(`${process.env.REACT_APP_BASEURL}/api/answers`, {
			data: {
				answer: answerImg,
				question: e.target.name,
				profile: userId
			}
		}).then(()=> {
			console.log("Uspesno ubacena slika u odg");
		})
		});
		
	}
		
	return (
		<div className="container">

			<div className="row justify-content-around">
				<div className="col-md-10 mt-4">


					<div className="card">
						<div className="card-body">

							<div>

								{Questions.data.data.data.map((question, index) => (
									<div key={index}>
										<h6>{question.attributes.text}</h6>
										<div className="mt-2">
											{question.attributes.type === "text" || question.attributes.type === "long_text" ? (
												<input name={question.id} type="text" className="form-control mb-3" onChange={(e) => getAnswer(e) }/>
												
											) : (<input type="file" name={question.id} className="form-control mb-3" onChange={(e) => getImage(e) }/>)}

										</div>
									</div>
								))}
								<button value="Save" className="btn btn-primary mt-3 basic-info text-right" onClick={()=>setAnswer()}>Save</button>
								
							</div>

						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserQuestionsDisplay;