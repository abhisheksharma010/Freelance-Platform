const express = require('express');
const router = express.Router();
const { requiredSignIn } = require("./ak.js");
const { getAllProposalsOfUser, addProposal, removeProposal, getProposalByProjectAndFreelancer
} = require("../controller/proposalController");

router.post('/add', requiredSignIn, addProposal);
router.get('/get', requiredSignIn, getProposalByProjectAndFreelancer);
router.delete('/remove/:proposalId', requiredSignIn, removeProposal);
router.get('/getAll', requiredSignIn, getAllProposalsOfUser);


module.exports = router;
