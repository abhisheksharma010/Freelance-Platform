import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link
import Layout from "../../components/Layout";
import FreelancerMenu from "../../components/FreelancerMenu";

const FreelancerOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const { data } = await axios.get("/contracts/current-user");
            console.log(data);
            setOrders(data.contracts);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = async (orderId, value) => {
        try {
            const { data } = await axios.put(`/api/v1/freelancer/update-order`, {
                orderId: orderId,
                status: value,
            });
            fetchOrders();
        } catch (error) {
            console.log(error);
        }
    };

    // Define handleGetContractsClick function if needed
    const handleGetContractsClick = () => {
        // Define functionality here
    };

    return (
        <Layout title="All Contract List">
            <div className="row">
                <div className="col-md-3 mt-5">
                    <FreelancerMenu />
                </div>
                <div className="col-md-9 mt-5">
                    {/* Button to trigger getContractsClick */}
                    {/* <button className="btn btn-primary mb-3" onClick={handleGetContractsClick}>Get Contracts</button> */}
                    <div className="row">
                        {orders.map((contract) => (
                            <div className="col-md-4 mb-4" key={contract._id}>
                                <div className="card h-100">
                                    <div className="card-body">
                                        <h5 className="card-title">{contract.name}</h5>
                                        <p className="card-text">{contract.description}</p>
                                        {/* Use Link to navigate to contract details */}
                                        <Link to={`/client/${contract._id}`} className="btn btn-outline-primary">Update</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {orders.length === 0 && <p>No contracts available.</p>}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default FreelancerOrders;
