import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Layout from '../../components/Layout';
import '../styles/ContractClient.css';
import toast from "react-hot-toast";


const ContractClient = () => {
    const [contract, setContract] = useState(null);
    const [proposals, setProposals] = useState([]);
    const contractId = useParams();

    useEffect(() => {
        fetchContractDetails();
        fetchProposals();
    }, []);

    const fetchContractDetails = async () => {
        try {
            const response = await axios.get(`/contracts/${contractId.id}`);
            setContract(response.data.contract);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchProposals = async () => {
        try {
            const response = await axios.get(`/contracts/${contractId.id}/proposals`);
            setProposals(response.data.proposals);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAcceptProposal = async (proposalId) => {
        try {
            const response = await axios.put(`/contracts/${contractId.id}/freelancer`, { proposalId });
            if (response.status === 200) {
                toast.success('Proposal accepted successfully!');
            } else {
                toast.error('Failed to accept proposal');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Layout title={`Contracts}`}>
            <div className='content-1'>
                <div className="contract-container">
                    <div className="contract-row">
                        <div className="contract-col">
                            {contract && (
                                <div>
                                    <h2 className="contract-heading">Contract Details</h2>
                                    <p className="contract-text">Title: {contract.title}</p>
                                    <p className="contract-text">Description: {contract.description}</p>
                                </div>
                            )}
                        </div>
                        <div className="contract-col">
                            <h2 className="contract-heading">Proposals</h2>
                            <ul className="contract-list">
                                {proposals && proposals.map((proposal) => (
                                    <li key={proposal.id} className="proposal-item">
                                        <p className="contract-text">Description: {proposal.message}</p>
                                        <p className="contract-text">Deadline: {new Date(proposal.deadline).toLocaleDateString()}</p>
                                        <p className="contract-text">Amount: {proposal.amount}</p>
                                        <button onClick={() => handleAcceptProposal(proposal.proposalId)} className="contract-button">Accept Proposal</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ContractClient;
