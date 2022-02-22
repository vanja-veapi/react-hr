import React from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import axios from "axios";
import useCompanyQuestions from "../../../hooks/questions/useCompanyQuestions";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";



const AdminSingleQuestion = (props) => {

  const navigate = useNavigate();
    const hendleEdit = () => {
        navigate('/edit-question', { state: { id: props.id } });
    };


    const allCompanyQuestions = useCompanyQuestions();
    let questionArray = [];
   

    if (allCompanyQuestions.status === "success") {
        questionArray = allCompanyQuestions.data.data.data;
    
        console.log(questionArray)
      }
      
      const deleteQuestion = useMutation((id) => {
        return axios.delete(`${process.env.REACT_APP_BASEURL}/api/questions/${id}`).then((data) => {
            console.log('success');
            allCompanyQuestions.refetch();
            
        })
        .catch((err) => {
            console.log(err);
        });
        
      });
      
      const deleteMutationAnswer = useMutation((id) => {
        return axios.delete(`${process.env.REACT_APP_BASEURL}/api/answers/${id}`);
      });

      const handleDelete = (id) => {
        let answers = questionArray[questionArray.findIndex(x => x.id === id)].attributes.answers
        if(answers.data.length!==0){
          for(let i=0;i<answers.data.length;i++){
            console.log(answers.data[i])
            deleteMutationAnswer.mutate(answers.data[i].id)
          }
        }
        deleteQuestion.mutate(id);
    }

    return (
        <div className="d-flex container justify-content-between border my-3">
            <div className="px-3  d-flex ">
                <div className="d-flex py-3 flex-column justify-content-between">
                    <button className="btn p-0 m-1"><FaArrowUp size={20} /></button>
                    <button className="btn p-0 m-1"><FaArrowDown size={20} /></button>
                </div>
                <div className="p-3 d-flex flex-column justify-content-center">
                    <div>Question { props.index+1 } </div>
                    <h4>{props.question}</h4>
                </div>
            </div>
            <div className="d-flex align-items-baseline align-content-center my-auto">
                <button className="btn btn-primary px-4 m-2 align-items-start" onClick={hendleEdit}>Edit</button>
                <button className="btn btn-danger px-4 m-2"  onClick={() => handleDelete(props.id)}>Delete</button>
            </div>
        </div>
    )
}

export default AdminSingleQuestion;