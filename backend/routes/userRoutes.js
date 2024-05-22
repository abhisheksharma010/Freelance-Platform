const express = require('express');
const { updateClientProfile, getUserDetails } = require("../controller/userController");
const { requiredSignIn } = require("./ak.js");

const router = express.Router();

router.put('/', requiredSignIn, updateClientProfile);
router.get('/', requiredSignIn, getUserDetails);


module.exports = router;
