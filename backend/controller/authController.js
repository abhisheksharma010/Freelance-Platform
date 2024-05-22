
const { hashCode, comparePassword } = require('../helpers/authhelper');
const usermodel = require('../models/userModel');
var nodemailer = require('nodemailer');


const JWT = require('jsonwebtoken');
const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, role } = req.body;
        console.log(` this is ${req.body}`);
        if (!name || !email || !password) {
            console.log(` this is a ${req.body}`);

            return res.status(400).send({ message: "Name, email, password, and role are required" });
        }

        const existingUser = await usermodel.findOne({ email });
        if (existingUser) {
            return res.status(400).send({
                success: false,
                message: "User with this email already exists"
            });
        }

        const hashedPassword = await hashCode(password);

        const user = await new usermodel({
            name,
            email,
            phone,
            address,
            password: hashedPassword,
            role: role
        }).save();

        res.status(201).send({
            success: true,
            message: "User registered successfully",
            user
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error while registering user",
            error: error.message
        });
    }
};


const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body);
        if (!email) {
            return res.send({ error: "Email is required" });
        }
        const user = await usermodel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: ' User is not registered',

            });
        }
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(200).send({
                success: false,
                message: 'Password is incorrect'
            }
            )
        }

        const token = await JWT.sign({ _id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        res.status(200).send({
            success: true,
            message: 'Login Successfully',
            user,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in login',
            error
        })
    }
}
const testController = (req, res) => {
    try {
        res.send("Protected Routes");
    } catch (error) {
        console.log(error);
        res.send({ error });
    }
};

const forgotPasswordController = async (req, res) => {
    const { email } = req.body;
    console.log(email);
    try {
        const oldUser = await usermodel.findOne({ email });
        if (!oldUser) {
            return res.send('User does not exist');
        }
        const secret = process.env.JWT_SECRET + oldUser.password;
        const token = JWT.sign({ email: oldUser.email, id: oldUser._id }, secret, {
            expiresIn: "5m",
        });
        const link = `http://localhost:3000/reset-password/${encodeURIComponent(oldUser._id)}/${encodeURIComponent(token)}`;

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'abhishek.sharma55400@gmail.com',
                pass: 'lhfl gnji nqbr qtaa'
            }
        });
        var mailOptions = {
            from: 'youremail@gmail.com',
            to: oldUser.email,
            subject: 'Reset Password',
            text: link,
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        return res.status(201).send({

            success: true,
            message: 'Mailed is send',

        })

    } catch (error) {
        console.log(error);

    }

}

const resetPassword = async (req, res) => {
    const { id, token, password } = req.body;

    const oldUser = await usermodel.findOne({ _id: id });
    console.log("called");
    console.log(password);
    console.log(id);
    console.log(token);
    console.log(oldUser);

    if (!oldUser) {
        return res.json({ status: "User Not Exists!!" });
    }

    const secret = process.env.JWT_SECRET + oldUser.password;

    try {
        const decode = JWT.verify(token, secret);

        if (decode.exp < Date.now() / 1000) {
            return res.status(400).json({
                success: false,
                message: "Token has expired. Please request a new password reset link.",
            });
        }

        const hashpassword = await hashCode(password);
        await usermodel.findByIdAndUpdate(oldUser._id, { password: hashpassword });
        res.status(200).send({
            success: true,
            message: "Password Reset Successfully",
        });
    } catch (error) {
        console.log(error);
        if (error.name === "TokenExpiredError") {
            return res.status(400).json({
                success: false,
                message: "Token has expired. Please request a new password reset link.",
            });
        }

        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error,
        });
    }
};

module.exports = { registerController, loginController, testController, forgotPasswordController, resetPassword };