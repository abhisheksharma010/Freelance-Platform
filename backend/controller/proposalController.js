const Proposal = require('../models/proposalModel');

const addProposal = async (req, res) => {
    try {
        const { project, message, amount, deadline } = req.body;
        const freelancer = req.user._id;

        if (!freelancer || !project || !message || !amount || !deadline) {
            return res.status(400).send({ message: "Freelancer, project, message, amount, and deadline are required" });
        }

        const existingProposal = await Proposal.findOne({ freelancer, project });

        if (existingProposal) {
            return res.status(400).send({ message: "Proposal already exists for this freelancer and project" });
        }

        const proposal = await new Proposal({
            freelancer,
            project,
            message,
            amount,
            deadline
        }).save();

        res.status(201).send({
            success: true,
            message: "Proposal added successfully",
            proposal
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error while adding proposal",
            error: error.message
        });
    }
};

const removeProposal = async (req, res) => {
    try {
        const proposalId = req.params.proposalId;
        const deletedProposal = await Proposal.findOneAndDelete({ _id: proposalId });

        if (!deletedProposal) {
            return res.status(404).send({ message: "Proposal not found" });
        }

        res.status(200).send({
            success: true,
            message: "Proposal removed successfully",
            proposal: deletedProposal
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error while removing proposal",
            error: error.message
        });
    }
};

const getProposalByProjectAndFreelancer = async (req, res) => {
    try {
        const { projectId } = req.query;
        const freelancerId = req.user._id;
        console.log(projectId + " " + freelancerId);
        console.log(req.query);
        const proposal = await Proposal.findOne({ project: projectId, freelancer: freelancerId });

        if (!proposal) {
            return res.status(404).send({ message: "Project id nahi found" });
        }

        res.status(200).send({ proposal });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error while fetching proposal",
            error: error.message
        });
    }
};

const getAllProposalsOfUser = async (req, res) => {
    try {
        const userId = req.user._id;
        const proposals = await Proposal.find({ freelancer: userId });
        console.log("reached");
        res.status(200).send({ proposals });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error while fetching proposals",
            error: error.message
        });
    }
};

module.exports = {
    addProposal, getAllProposalsOfUser,
    removeProposal, getProposalByProjectAndFreelancer
};
