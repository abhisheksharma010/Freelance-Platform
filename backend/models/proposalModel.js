const mongoose = require('mongoose');

const proposalSchema = new mongoose.Schema({
    freelancer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    deadline: {
        type: Date,
        required: true,
    },
    selected: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });

module.exports = mongoose.model('Proposal', proposalSchema);
