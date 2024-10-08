const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const deedSchema = new Schema({
    assignedLawyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lawyer",
        required: true
    },
    deedType: {
        type: String,
        required: true
    },
    preRegisteredNo: {
        type: String,
        required: false
    },
    title: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    division: {
        type: String,
        required: true
    },
    considerationValue: {
        type: Number,
        required: true
    },
    grantor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client",
        required: true
    },
    grantorNic :{
        type: String,
        required: true
    },
    grantee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client",
        required: true
    },
    granteeNic :{
        type: String,
        required: true
    },
    deedNo: {
        type: Number,
        required: true
    },
    lawyerFee: {
        type: Number,
        required: true
    },
    taxFee: {
        type: Number,
        required: true
    },
    totalFee: {
        type: Number,
        required: true
    },
    deedStatus: {
        type: String,
        required: true,
        enum: ["Pending", "Approved", "Rejected","Created","Registered"],
        default: "Created"
    }
}, {
    timestamps: true 
});

const Deed = mongoose.model("Deed", deedSchema);
module.exports = Deed;