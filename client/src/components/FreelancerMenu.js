import React from "react";
import { NavLink } from "react-router-dom";
const FreelancerMenu = () => {
    return (
        <>
            <div className="text-center">
                <div className="list-group dashboard-menu">
                    <h4>Freelancer Panel</h4>
                    <NavLink
                        to="/freelancer/profile"
                        className="list-group-item list-group-item-action"
                    >
                        Freelancer Profile
                    </NavLink>
                    <NavLink
                        to="/freelancer/proposal"
                        className="list-group-item list-group-item-action"
                    >
                        Freelancer Proposal
                    </NavLink>
                    <NavLink
                        to="/freelancer/orders"
                        className="list-group-item list-group-item-action"
                    >
                        Freelancer Contract
                    </NavLink>


                </div>
            </div>
        </>
    );
};
export default FreelancerMenu;