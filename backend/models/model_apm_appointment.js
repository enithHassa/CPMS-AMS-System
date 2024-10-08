// created by : R.M.S.D. Rathnayake - IT22140616

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const appointmentSchema = new Schema({

    requestID : {
        type : String,
        required : true,
    },

    discussedPoints : {
        type : String
    },
    
    agreedPayment : {
        type : String
    },

    requestedDocuments : {
        type : String
    },

    nextAppointmentDate : {
        type : Date
    },
    
    appointmentStatus : {
        type : String,
        required : true,
    }
})

const Appointment = mongoose.model("appointment", appointmentSchema);

module.exports = Appointment;