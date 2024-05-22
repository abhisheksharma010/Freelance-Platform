import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "./styles/ContractDetailPage.css";
import Layout from '../components/Layout';
import toast from "react-hot-toast";

const ContractCardDetail = () => {
    const { id } = useParams();
    const [contract, setContract] = useState(null);
    const [client, setClient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [amount, setAmount] = useState(0);
    const [deadline, setDeadline] = useState(new Date());
    const [previousProposal, setPreviousProposal] = useState(null);
    const [showPreviousProposal, setShowPreviousProposal] = useState(false);

    useEffect(() => {
        const fetchContract = async () => {
            try {
                const contractResponse = await axios.get(`/contracts/${id}`);
                setContract(contractResponse.data.contract);
                setClient(contractResponse.data.client);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchContract();

        fetchPreviousProposal();
    }, [id]);

    const fetchPreviousProposal = async () => {
        try {
            const response = await axios.get('/proposals/get', {
                params: { projectId: id }
            });
            setPreviousProposal(response.data.proposal);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmitProposal = async () => {
        try {
            const proposalData = { project: id, message, amount, deadline };
            const response = await axios.post('/proposals/add', proposalData);
            toast.success("Proposal submitted and accepted!");
            fetchPreviousProposal();
        } catch (error) {
            toast.error("Proposal submitted but not accepted.");
            console.error(error);
        }
    };

    const handleDeleteProposal = async () => {
        try {
            await axios.delete(`/proposals/remove/${previousProposal._id}`);
            toast.success("Previous proposal deleted successfully!");
            setPreviousProposal(null);
        } catch (error) {
            toast.error("Error deleting previous proposal.");
            console.error(error);
        }
    };

    return (
        <Layout title={"All Products - Best offers "}>
            <div className='content'>
                <div className="contract-detail-container">
                    {contract && (
                        <div className="contract-detail-card">
                            <h2 className="category">{contract.category}</h2>
                            <div className="contract-details">
                                <h3>{contract.title}</h3>
                                <p>Description: {contract.description}</p>
                                <p>Amount: {contract.amount}</p>
                                <p>Deadline: {contract.deadline}</p>
                                <p>Status: {contract.status}</p>
                            </div>
                        </div>
                    )}
                    {client && (
                        <div className="client-detail-card">
                            <h2>Client Details</h2>
                            <p>Name: {client.name}</p>
                            <p>Email: {client.email}</p>
                            <p>Phone: {client.phone}</p>
                        </div>
                    )}
                </div>
                <div>
                    <div className="proposal-form-container">
                        <div className="proposal-form">
                            <h2>Submit Proposal</h2>
                            <textarea
                                className="proposal-input"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            <input
                                className="proposal-input"
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(parseFloat(e.target.value))}
                            />
                            <input
                                className="proposal-input"
                                type="date"
                                value={deadline}
                                onChange={(e) => setDeadline(e.target.value)}
                            />
                            <button
                                className="submit-proposal-button btn btn-success"
                                onClick={handleSubmitProposal}
                                disabled={!!previousProposal}
                                style={{ cursor: previousProposal ? 'not-allowed' : 'pointer' }}
                            >
                                {previousProposal ? 'Proposal Already Submitted' : 'Submit Proposal'}
                            </button>
                        </div>
                    </div>
                    {showPreviousProposal && previousProposal && (
                        <div className="previous-proposal">
                            <h2>Previous Proposal</h2>
                            <p>Message: {previousProposal.message}</p>
                            <p>Amount: {previousProposal.amount}</p>
                            <p>Deadline: {previousProposal.deadline}</p>
                            <button className="delete-proposal-button btn btn-danger" onClick={handleDeleteProposal}>Delete Proposal</button>
                        </div>
                    )}
                    {!showPreviousProposal && !previousProposal && (
                        <div className="no-proposal">
                            <p>You have not sent any proposal yet.</p>
                        </div>
                    )}
                    <button className="m-5 btn-warning toggle-previous-proposal-btn" onClick={() => setShowPreviousProposal(!showPreviousProposal)}>
                        {showPreviousProposal ? 'Hide Previous Proposal' : 'Show Previous Proposal'}
                    </button>
                </div>
            </div>

        </Layout>
    );
};

export default ContractCardDetail;
