import React from "react";
import  "./Sidebar.css";
import{FaChevronRight} from 'react-icons/fa'
import { Navigate, NavLink, useNavigate } from "react-router-dom";



const SidebarMenu = ()=> {
    const navigate = useNavigate();
    return(
        <div className="menu">
            <div className="title-menu">
                <h2>Menu</h2>
            </div>
            <div className="options">
                <div className="pending-div">
                    <FaChevronRight className="icons-arow"/>
                    <span>Pending for approval</span>
                </div>
                <div className="team">
                    <FaChevronRight className="icons-arow"/>
                    <span>Team</span>
                </div>
                <div className="questions">
                <FaChevronRight className="icons-arow"/>
                    <span onClick={() => navigate("/questions-admin")}>Questions</span>
                </div>
                <div className="company-info">
                <FaChevronRight className="icons-arow"/>
                    <span onClick={() => navigate("/company-info")}>Company Info</span>
                </div>
                <div className="my-profile">
                <FaChevronRight className="icons-arow"/>
                   <span onClick={() => navigate("/my-profile")}>My Profile</span>
                </div>
            </div>
        </div>
    )
}
export default SidebarMenu;