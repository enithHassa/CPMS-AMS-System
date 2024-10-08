const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CaseSchema = new Schema({
    caseNumber: {
        type: String,
        required: true
    },
    procedure: {
        type: String,
        required: true
    },
    courtType: {
        type: String,
        required: true
    },
    courtArea: {
        type: String,
        required: true
    },
    monetaryValue: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    neededDocuments: {
        type: String,
        required: true
    },
    nature: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phonenumber: {
        type: String,
        required: true
    },
    nic: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true    
    }
});

const Case = mongoose.model("case", CaseSchema);

module.exports = Case; // Corrected the export statement
