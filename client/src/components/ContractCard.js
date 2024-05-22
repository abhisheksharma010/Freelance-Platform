import React from 'react';
import "../pages/styles/ContractCard.css";
import { Link } from 'react-router-dom';

const ContractCard = ({ contract }) => {


    const { title, description, amount, deadline, status, category } = contract;

    return (
        <Link to={`/contracts/${contract._id}`} className="contract-card-link">

            <div className="contract-card m-4">
                <h2>{title}</h2>
                <p>Description: {description}</p>
                <p>Amount: {amount}</p>
                <p>Deadline: {deadline}</p>
                <p>Status: {status}</p>
                <p>Category: {category}</p>
            </div>
        </Link>
    );
}

export default ContractCard;
