const express = require('express');
const { requiredSignIn } = require("./ak.js");
const {
    getAllContracts,
    getUnassignedContract,
    changeSubmissionStatus,
    addFreelancerToContract,
    getContractByCategory,
    getAllProposalsForContract,
    getAssignedFreelancerForContract,
    getContractsForCurrentUser,
    createContract,
    getContractById// Add this function in your require
} = require("../controller/contractController.js");

const router = express.Router();

router.get('/getall/:page', getAllContracts);
router.get('/unassigned', requiredSignIn, getUnassignedContract);
router.put('/submission', requiredSignIn, changeSubmissionStatus);
router.put('/:contractId/freelancer', requiredSignIn, addFreelancerToContract);
router.get('/category/:category', getContractByCategory);
router.get('/:contractId/proposals', getAllProposalsForContract);
router.get('/:contractId/freelancer', requiredSignIn, getAssignedFreelancerForContract);
router.get('/current-user', requiredSignIn, getContractsForCurrentUser);
router.post('/create', requiredSignIn, createContract);
router.get('/:contractId', getContractById);
module.exports = router;
