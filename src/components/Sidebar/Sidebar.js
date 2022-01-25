import React from "react";
import arrowRight from "../../assets/arrow-right.png";
import styles from "./Sidebar.css";

const SidebarMenu = ()=> {
    return(
        <div className="menu">
            <div className="title-menu">
                <h2>Menu</h2>
            </div>
            <div className="options">
                <div className="pending-div">
                    <img src={arrowRight} alt="arrow-right.png" />
                    <span>Pending for approval</span>
                </div>
                <div className="team">
                    <img src={arrowRight} alt="arrow-right.png" />
                    <span>Team</span>
                </div>
                <div className="questions">
                    <img src={arrowRight} alt="arrow-right.png" />
                    <span>Questions</span>
                </div>
                <div className="company-info">
                    <img src={arrowRight} alt="arrow-right.png" />
                    <span>Company Info</span>
                </div>
                <div className="my-profile">
                    <img src={arrowRight} alt="arrow-right.png" />
                    <span>My Profile</span>
                </div>
            </div>
        </div>
    )
}
export default SidebarMenu;