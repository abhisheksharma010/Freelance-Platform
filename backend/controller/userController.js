const User = require('../models/userModel');

const updateClientProfile = async (req, res) => {
    const { name, email, phone, address, skills } = req.body;
    const clientId = req.user._id;

    try {
        console.log("Reached u");
        let client = await User.findById(clientId);

        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }

        client.name = name;
        client.email = email;
        client.phone = phone;
        client.address = address;
        client.skills = skills; // Update the skills field

        await client.save();

        res.status(200).json({ message: 'Client profile updated successfully', client });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getUserDetails = async (req, res) => {
    try {
        console.log("reached");
        const userId = req.user._id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while fetching user details", error: error.message });
    }
};

module.exports = {
    updateClientProfile,

    getUserDetails
};
