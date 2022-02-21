import React from "react";
import  "./Sidebar.css";
import{FaChevronRight} from 'react-icons/fa';
import { Navigate, useNavigate } from "react-router-dom";



const SidebarUser = ()=> {
    const navigate = useNavigate();
    return(
        <div className="menu">
            <div className="title-menu">
                <h2>Menu</h2>
            </div>
            <div className="options">
                <div className="team">
                    <FaChevronRight className="icons-arow"/>
                    <span>Team</span>
                </div>
                <div className="questions">
                    <FaChevronRight className="icons-arow"/>
                    <span onClick={() => navigate("/questions")}>Questions</span>
                </div>
                <div className="my-profile">
                    <FaChevronRight className="icons-arow"/>
                    <span onClick={() => navigate("/my-profile")}>My Profile</span>
                </div>
            </div>
        </div>
    )
}
export default SidebarUser;