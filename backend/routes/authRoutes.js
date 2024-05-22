const express = require('express');
const router = express.Router();
const { requiredSignIn, isClient } = require("./ak.js");
const { resetPassword, registerController, loginController } = require("../controller/authController");
router.post('/register', registerController);
router.post('/login', loginController);
router.post('/reset-password', resetPassword);
router.get("/user-auth", requiredSignIn, (req, res) => {
    res.status(200).send({ ok: true });
});
router.get("/client-auth", requiredSignIn, isClient, (req, res) => {
    res.status(200).send({ ok: true });
});
module.exports = router;
