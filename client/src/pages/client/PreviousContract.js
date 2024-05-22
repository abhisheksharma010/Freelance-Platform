import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../components/Layout";
import { Select } from "antd";
import moment from "moment";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import ClientMenu from "../../components/ClientMenu";

const { Option } = Select;

const Contract = () => {
    const [contracts, setContracts] = useState([]);
    const [status, setStatus] = useState([
        "Not Assigned",
        "Working",
        "Completed",
        "Cancelled",
    ]);

    useEffect(() => {
        getContracts();
    }, []);

    const getContracts = async () => {
        try {
            const { data } = await axios.get("/contracts/current-user");
            setContracts(data.contracts);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = async (contractId, value) => {
        try {
            await axios.put(`/contracts/status`, {
                contractId: contractId,
                status: value,
            });

            getContracts();
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmissionStatusChange = async (contractId, value) => {
        try {
            await axios.put(`/contracts/submission`, {
                contractId: contractId,
                status: value,
            });

            getContracts();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout title={"All Contracts Data"}>
            <div className="mt-5 row dashboard" style={{ alignItems: 'flex-start' }}>
                <div className="col-md-3 mt-5" >
                    <ClientMenu />
                </div>
                <div className="col-md-9 ">
                    <div className="mt-5 row dashboard" style={{ alignItems: "flex-start" }}>
                        <div className="col-md-12">
                            <h1 className="text-center">All Contracts</h1>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Freelancer</th>
                                        <th>Client</th>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Amount</th>
                                        <th>Deadline</th>
                                        <th>Status</th>
                                        <th>Client Submission</th>
                                        <th>Category</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {contracts.map((contract, index) => (
                                        <tr key={contract._id}>
                                            <td>{index + 1}</td>
                                            <td>{contract.freelancerId}</td>
                                            <td>{contract.clientId}</td>
                                            <td>
                                                <Link to={`/client/contracts/${contract._id}`}>{contract.title}</Link>
                                            </td>
                                            <td>{contract.description}</td>
                                            <td>{contract.amount}</td>
                                            <td>{moment(contract.deadline).format("MMMM D, YYYY")}</td>
                                            <td>
                                                <Select
                                                    bordered={false}
                                                    onChange={(value) => handleChange(contract._id, value)}
                                                    defaultValue={contract.status}
                                                    key={index}
                                                >
                                                    {status.map((s, j) => (
                                                        <Option key={j} value={s}>
                                                            {s}
                                                        </Option>
                                                    ))}
                                                </Select>
                                            </td>
                                            <td>
                                                <Select
                                                    bordered={false}
                                                    onChange={(value) => handleSubmissionStatusChange(contract._id, value)}
                                                    defaultValue={contract.clientSubmission ? "Yes" : "No"}
                                                    key={index}
                                                >
                                                    <Option value={true}>Yes</Option>
                                                    <Option value={false}>No</Option>
                                                </Select>
                                            </td>
                                            <td>{contract.category}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Contract;
