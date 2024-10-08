// created by : R.M.S.D. Rathnayake - IT22140616

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const appointmentRequestSchema = new Schema({

    // appointment request info
    appointmentRequestDate : {
        type : Date,
        required : true,
    },

    // sender info
      lawyerId : {
        type : String,
        required : true,
    },

    // receiver info
    appointmentManagerId : {
        type : String,
        required : true,
    },
    
    clientId : {
        type :String,
        required : true,
    },
    
    //appointment info
    appointmentType : {
        type : String,
        required : true,
    },

    title : {
        type : String,
        required : true,
    },

    description : {
        type : String,
        required : true,
    },

    appointmentDate : {
        type : Date,
        required : true,
    },

    appointmentTime : {
        type : String,
        required : true,
    },

    location : {
        type : String,
        required : true,
    },
    
    appointmentRequestStatus : {
        type : String,
        required : true,
    }
})

const AppointmentRequest = mongoose.model("appointmentrequest", appointmentRequestSchema);

module.exports = AppointmentRequest;