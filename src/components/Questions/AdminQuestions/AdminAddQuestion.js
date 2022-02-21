import React from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useState, useEffect } from 'react';
import useQuestions from '../../../hooks/questions/useQuestions';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from "react-query";

const AdminAddQuestion = () => {
    
      let company = useSelector((state) => state.dataReducer?.data?.data[0]?.attributes.company.data.id);
      if(!company){
        company = localStorage.getItem("companyId");
    }
      const [questionDetails, setQuestionDetails] = useState({
        text: "",
        type: "",
        company: company,
        order: "",
      });

      const allQuestions = useQuestions();
      const navigate = useNavigate();
      const allOrders = [];
      let makeOrder = false;
      let maxOrder;

      if (allQuestions.status === "success") {
        allQuestions.data.data.map((question, index) =>
          allOrders.push(question.attributes.order)
        );
        if (!makeOrder) {
          makeOrder = true;
        }
        console.log(allQuestions.data.data);
        
         maxOrder = allOrders[0];
          for(let i=0; i<allOrders.length; i++){
            if(allOrders[i]>maxOrder){
              maxOrder = allOrders[i];
            }
          }
      }

      const mutation = useMutation(
        (data) => {
          return axios.post(`${process.env.REACT_APP_BASEURL}/api/questions`, data)
        },
        {
          onSuccess: () => {
            navigate("/questions-admin");
          },
        }
      );
      
      const AddQuestion = (event) => {
        event.preventDefault();
        const data = { data: questionDetails };
        mutation.mutate(data);
        console.log(data);
      };
     
      useEffect(() => {
        if (makeOrder) {
          setQuestionDetails({ ...questionDetails, order: maxOrder + 1 });
        }
        
      }, [makeOrder]);

    return (
        <div className="container m-4 col-md-5">
            <h2>Add new Question</h2>
            <div className="form-group my-4">
                <label className="h6">Question text</label>
                <input placeholder='Question text' type="text" className="form-control" onChange={(e) => setQuestionDetails({...questionDetails, text: e.target.value,})} />
            </div>

            <div>
                <div className='col-6'>
                    <div className="form-group">
                        <label className="h6">Question type</label>
                        <Form.Select onChange={(e) => setQuestionDetails({ ...questionDetails, type: e.target.value })}>
                            <option>Select question type</option>
                            <option value="text">Text</option>
                            <option value="long_text">Long text</option>
                            <option value="image">Image</option>
                        </Form.Select>
                        
                    </div>
                </div>
            </div>
            <div className='d-flex justify-content-end'>
                <button value="Save" className="btn btn-primary mt-3 ml-auto basic-info text-right" onClick={AddQuestion}>Save</button>
            </div>
        </div>
    )
}

export default AdminAddQuestion;