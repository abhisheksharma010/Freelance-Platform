const Contact = require('../models/contactModel.js');
const Proposal = require('../models/proposalModel.js');
const User = require('../models/userModel.js');

const getContractById = async (req, res) => {
    try {
        const { contractId } = req.params;

        const contract = await Contact.findById(contractId);

        if (!contract) {
            return res.status(404).send({ error: "Contract not found" });
        }

        const client = await User.findById(contract.clientId);

        if (!client) {
            return res.status(404).send({ error: "Client not found" });
        }

        res.status(200).send({ contract, client });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
};

const getAllContracts = async (req, res) => {
    try {
        const perPage = 12;
        const page = req.params.page ? req.params.page : 1;
        const contracts = await Contact.find({})
            .skip((page - 1) * perPage)
            .limit(perPage)
            .sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            contracts,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error,
        });
    }
};


const addFreelancerToContract = async (req, res) => {
    try {
        const { contractId } = req.params;
        const { freelancerId } = req.body;
        console.log("yanha bhi agaya");
        await Contact.findByIdAndUpdate(contractId, { freelancerId });
        res.status(200).send({ message: "Freelancer added to contract successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
};

const categoryMapping = {
    "graphic-design": "Graphic Design",
    "web-development": "Web Development",
    "content-writing": "Content Writing",
    "digital-marketing": "Digital Marketing",
    "video-production": "Video Production",
    "app-development": "App Development"
};

const getContractByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const mappedCategory = categoryMapping[category];
        if (!mappedCategory) {
            return res.status(400).send({ error: "Invalid category slug" });
        }

        const contracts = await Contact.find({ category: mappedCategory });
        res.status(200).send({ contracts });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
};



const changeContractStatus = async (req, res) => {
    try {
        const { status, contractId } = req.body;
        console.log("hellod")
        console.log(`statud - ${status}`);
        console.log(`contractId - ${contractId}`);
        await Contact.findByIdAndUpdate(contractId, { status });
        res.status(200).send({ message: "Contract status updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
};

const changeSubmissionStatus = async (req, res) => {
    try {
        const { status, contractId } = req.body;

        console.log("hellod");
        console.log(`statud - ${status}`);
        console.log(`contractId - ${contractId}`);
        await Contact.findByIdAndUpdate(contractId, { clientSubmission: submissionStatus });
        res.status(200).send({ message: "Submission status updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
};

const getAllProposalsForContract = async (req, res) => {
    try {
        const { contractId } = req.params;
        console.log(contractId);
        console.log("la firh agaya");
        const proposals = await Proposal.find({ project: contractId });
        res.status(200).send({ proposals });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
};

const getAssignedFreelancerForContract = async (req, res) => {
    try {
        const { contractId } = req.params;
        const contract = await Contact.findById(contractId);
        const freelancerId = contract.freelancerId;
        res.status(200).send({ freelancerId });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
};

const getContractsForCurrentUser = async (req, res) => {
    try {
        console.log(req.user._id);
        const contracts = await Contact.find({ clientId: req.user._id });
        res.status(200).send({ contracts });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
};

const createContract = async (req, res) => {
    try {
        const { title, description, amount, deadline, category } = req.body;
        const clientId = req.user._id;
        console.log(req.body);
        console.log(req.query);
        const newContract = await Contact.create({
            title,
            description,
            amount,
            deadline,
            clientId,
            category
        });
        console.log("created");
        res.status(201).send({ contract: newContract });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
};

module.exports = {
    getAllContracts,
    getUnassignedContract,
    changeSubmissionStatus,
    addFreelancerToContract,
    getContractByCategory,
    getLatestContract,
    changeContractStatus,
    getAllProposalsForContract,
    getAssignedFreelancerForContract,
    getContractsForCurrentUser,
    createContract,
    getContractById
};
