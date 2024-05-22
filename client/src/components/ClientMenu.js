import React from "react";
import { NavLink } from "react-router-dom";
import "./ClientMenu.css"
const ClientMenu = () => {
    return (
        <>
            <div className="text-center">
                <div className="list-group dashboard-menu">
                    <h4>Client Panel</h4>
                    <NavLink
                        to="/client/create-contract"
                        className="list-group-item list-group-item-action"
                    >
                        Create Contract
                    </NavLink>
                    <NavLink
                        to="/client/previous-contract"
                        className="list-group-item list-group-item-action"
                    >
                        Previos Contract
                    </NavLink>


                </div>
            </div>
        </>
    );
};
export default ClientMenu;