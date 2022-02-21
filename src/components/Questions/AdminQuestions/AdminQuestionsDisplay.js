import React from "react";
import axios from "axios";
import AdminSingleQuestion from "./AdminSingleQuestion";
import AllQuestions from "../AllQuestions";
import { useNavigate } from "react-router-dom";



const AdminQuestionsDisplay = () => {
    const navigate = useNavigate();



    return (
        <div className="container m-4 p-0">
            <div className="d-flex mb-3 justify-content-between align-items-baseline">
                <h3 className="d-inline-block">Questions</h3>
                <button className="btn btn-outline-primary" size="sm" onClick={ ()=> navigate("/new-question")}>+ Add new question</button>
            </div>
            <div><AllQuestions/></div>
        </div>
    )
}

export default AdminQuestionsDisplay;