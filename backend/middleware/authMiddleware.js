const JWT = require('jsonwebtoken');
const userModel = require('../models/userModel');

const requiredSignIn = async (req, res, next) => {
    try {
        const decodedToken = JWT.verify(
            req.headers.authorization,
            process.env.JWT_SECRET
        );
        req.user = decodedToken;
        next();
    } catch (error) {
        console.log("Error in requiredSignIn middleware:", error.message);
        res.status(401).send({
            success: false,
            message: "Unauthorized access",
            error: error.message
        });
    }
};

const isClient = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);
        if (!user || user.role !== 1) {
            return res.status(401).send({
                success: false,
                message: 'Unauthorized User'
            });
        }
        next();
    } catch (error) {
        console.log("Error in isClient middleware:", error.message);
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

module.exports = { requiredSignIn, isClient };
