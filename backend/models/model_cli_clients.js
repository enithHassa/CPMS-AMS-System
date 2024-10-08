const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema ({

    fname: {
        type: String,
        required: false 
    },
    lname: {
        type: String,
        required: false 
    },
    nic: {
        type: Number,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    district: {
        type: String,
        required: false
    },
    province: {
        type: String,
        required: false
    },
    phone: {
        type: Number,
        required: false
    },
    email: {
        type: String,
        required: true // Email is required during creation
    },
    password: {
        type: String,
        required: true // Password is required during creation
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

const Client = mongoose.model("Client", clientSchema);
module.exports = Client;
