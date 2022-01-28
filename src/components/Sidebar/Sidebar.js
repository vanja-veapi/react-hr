import React from "react";
import  "./Sidebar.css";
import{FaChevronRight} from 'react-icons/fa'


const SidebarMenu = ()=> {
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
                    <span>Questions</span>
                </div>
                <div className="company-info">
                <FaChevronRight className="icons-arow"/>
                    <span>Company Info</span>
                </div>
                <div className="my-profile">
                <FaChevronRight className="icons-arow"/>
                    <span>My Profile</span>
                </div>
            </div>
        </div>
    )
}
export default SidebarMenu;