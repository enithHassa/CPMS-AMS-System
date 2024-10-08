const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const lawyerSchema = new Schema({
    firstName: {
        type: String, 
        required: true
    },
    
    lastName: {
        type: String, 
        required: true
    },

    address: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true, 
        match: /.+\@.+\..+/
    },
    
    userType: {
        type: String,
        required: true,
        enum: ['Lawyer'] 
    },

    phoneNumber: {
        type: String,
        required: true,
        unique: true 
    },

    education: {
        type: String,
        required: true
    },

    temporaryPassword: {
        type: String,
        required: false 
    },

    profilePicture: {
        type: String, 
        required: false
    }
}, {
    timestamps: true 
});

const Lawyer = mongoose.model("Lawyer", lawyerSchema);

module.exports = Lawyer;