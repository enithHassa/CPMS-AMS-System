const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client', // Assuming 'Client' is the client model
        required: true
    },
    userMsg: {
        type: String,
        required: false // To store the client's message
    },
    lawyerMsg: {
        type: String,
        required: false // To store the lawyer's message, if applicable
    },
    dateTime: {
        type: Date,
        default: Date.now // Auto-store the timestamp when the message is sent
    }
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
