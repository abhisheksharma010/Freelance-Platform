const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    freelancerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
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
    status: {
        type: String,
        default: "Not Assigned",
        enum: ["Not Assigned", "Working", "Completed", "Cancelled"],
    },
    clientSubmission: {
        type: Boolean,
        default: false,
    },
    category: {
        type: String,
        default: "Others",
        enum: ["Web Development", "App Development", "Content Writing", "Digital Marketing", "Graphic Design"]
    }
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);
