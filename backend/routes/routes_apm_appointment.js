// created by : R.M.S.D. Rathnayake - IT22140616

const router = require("express").Router();
let appointment = require("../models/model_apm_appointment");

// add new appointment
router.route("/add_appointment").post((req, res) => {
    const requestID = req.body.requestID;
    const discussedPoints  = req.body.discussedPoints;
    const agreedPayment  = req.body.agreedPayment;
    const requestedDocuments  = req.body.requestedDocuments;
    const nextAppointmentDate = new Date(req.body.nextAppointmentDate);
    const appointmentStatus = req.body.appointmentStatus;

    // creating new object
    const newAppointment = new appointment({
        requestID,
        discussedPoints,
        agreedPayment,
        requestedDocuments,
        nextAppointmentDate,
        appointmentStatus
    })

    // creating appointment request
    newAppointment.save().then(()=>{
        res.json("New Appointment Added..");
        }).catch(()=>{
                console.log(err);
                res.status(400).json("Error: " + err);
            })
})


// view all appointment request
router.route("/appointments").get((req, res)=> {
    appointment.find().then((appointments) => {
        res.json(appointments)
    }).catch((err) => {
        console.log(err);
    })
})

// Get a specific appointment request by ID
router.route("/appointment/:id").get((req, res) => {
    const appointmentId = req.params.id;

    appointment.findById(appointmentId)
        .then((appointment) => {
            if (appointment) {
                res.json(appointment);
            } else {
                res.status(404).json("Appointment Not Found");
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json("Error in Retrieving Appointment");
        });
});


// Update appointment request
router.route("/update_appointment/:id").put(async (req, res) => {
    const appointmentId = req.params.id;

    // Object to hold updated fields
    const updatedAppointment = {
        requestID : req.body.requestID,
        discussedPoints  : req.body.discussedPoints,
        agreedPayment  : req.body.agreedPayment,
        requestedDocuments  : req.body.requestedDocuments,
        nextAppointmentDate : Date(req.body.nextAppointmentDate),
        appointmentStatus : req.body.appointmentStatus
    };

    try {
        const result = await appointment.findByIdAndUpdate(appointmentId, updatedAppointment, { new: true });

        if (result) {
            res.json("Appointment Updated Successfully");
        } else {
            res.status(404).json("Appointment Not Found");
        }
    } catch (err) {
        console.log(err);
        res.status(500).json("Error in Updating Appointment");
    }
});


// delete appointment request
router.route("/delete_appointment/:id").delete(async(req, res)=> {
    let appointmentId = req.params.id;

    await appointment.findByIdAndDelete(appointmentId).then(()=> {
        res.status(200).send({status:"Appointment deleted"});
    }).catch((err)=> {
        console.log(err.messsage);
        res.status(500).send({status:"Error in delete appointment", error:err.messsage})
    })
})

module.exports = router;