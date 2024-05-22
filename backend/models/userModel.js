const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    role: {
        type: Number,
        default: 0
    },
    proposal: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Proposal',
        required: true,
    }],
    contract: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contact',
        required: true,
    }],

    skills: [{
        type: String,
    }],
}, { timestamps: true });

module.exports = mongoose.model('Users', userSchema);
