import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ContractDetail = () => {
    const [contract, setContract] = useState({});
    const [proposals, setProposals] = useState([]);
    const [contractId, setContractId] = useState(null); // State to store the contract ID

    useEffect(() => {
        const fetchContractAndProposals = async () => {
            try {
                // Fetch the contract ID first
                const contractIdResponse = await axios.get('/contracts/current-user-id');
                const fetchedContractId = contractIdResponse.data.contractId;

                // Use the fetched contract ID to fetch contract details
                const contractResponse = await axios.get(`/contracts/${fetchedContractId}`);
                const proposalResponse = await axios.get(`/proposals/${fetchedContractId}`);

                setContract(contractResponse.data.contract);
                setProposals(proposalResponse.data.proposals);
                setContractId(fetchedContractId); // Set the contract ID state
            } catch (error) {
                console.error('Error fetching contract and proposals:', error);
            }
        };

        fetchContractAndProposals();
    }, []);

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6">
                    <div>
                        <h2>Contract Details</h2>
                        <table className="table">
                            <tbody>
                                <tr>
                                    <th>Title</th>
                                    <td>{contract.title}</td>
                                </tr>
                                <tr>
                                    <th>Description</th>
                                    <td>{contract.description}</td>
                                </tr>
                                <tr>
                                    <th>Amount</th>
                                    <td>{contract.amount}</td>
                                </tr>
                                <tr>
                                    <th>Deadline</th>
                                    <td>{contract.deadline}</td>
                                </tr>
                                <tr>
                                    <th>Status</th>
                                    <td>{contract.status}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-md-6">
                    <div>
                        <h2>Proposals</h2>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Freelancer</th>
                                    <th>Message</th>
                                    <th>Amount</th>
                                    <th>Deadline</th>
                                    <th>Select</th>
                                </tr>
                            </thead>
                            <tbody>
                                {proposals.map((proposal) => (
                                    <tr key={proposal._id}>
                                        <td>{proposal.freelancer}</td>
                                        <td>{proposal.message}</td>
                                        <td>{proposal.amount}</td>
                                        <td>{proposal.deadline}</td>
                                        <td>
                                            <button className="btn btn-primary">Select</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContractDetail;
