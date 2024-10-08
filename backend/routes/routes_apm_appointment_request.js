// created by : R.M.S.D. Rathnayake - IT22140616

const router = require("express").Router();
let appointmentRequest = require("../models/model_apm_appointment_request");

router.route("/add_appointment_request").post((req, res) => {
    const appointmentRequestDate = Date(req.body.appointmentRequestDate);
    const lawyerId = req.body.lawyerId;
    const clientId = req.body.clientId;
    const appointmentManagerId = req.body.appointmentManagerId; 
    const appointmentType  = req.body.appointmentType;    
    const appointmentDate = Date(req.body.appointmentDate);
    const appointmentTime = req.body.appointmentTime;
    const title = req.body.title;
    const description = req.body.description;    
    const location  = req.body.location;
    const appointmentRequestStatus = req.body.appointmentRequestStatus; 

    // creating new object
    const newAppointmentRequest = new appointmentRequest({
        appointmentRequestDate,
        lawyerId,
        clientId,
        appointmentManagerId,
        appointmentType,
        appointmentDate,
        appointmentTime,
        title,
        description,
        location,
        appointmentRequestStatus
    })

    // creating appointment request
    newAppointmentRequest.save().then(()=>{
        res.json("New Appointment Request Added");
        }).catch(()=>{
                console.log(err);
            })
})


// view all appointment request
router.route("/appointment_requests").get((req, res)=> {
    appointmentRequest.find().then((appointmentrequests) => {
        res.json(appointmentrequests)
    }).catch((err) => {
        console.log(err);
    })
})

// Get a specific appointment request by ID
router.route("/appointment_request/:id").get((req, res) => {
    const appointmentRequestId = req.params.id;

    appointmentRequest.findById(appointmentRequestId)
        .then((appointmentRequest) => {
            if (appointmentRequest) {
                res.json(appointmentRequest);
            } else {
                res.status(404).json("Appointment Request Not Found");
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json("Error in Retrieving Appointment Request");
        });
});


// Update appointment request
router.route("/update_appointment_request/:id").put(async (req, res) => {
    const appointmentRequestId = req.params.id;

    // Object to hold updated fields
    const updatedAppointmentRequest = {
        appointmentRequestDate: Date(req.body.appointmentRequestDate),
        lawyerId: req.body.lawyerId,
        clientId: req.body.clientId,
        appointmentManagerId: req.body.appointmentManagerId,
        appointmentType: req.body.appointmentType,
        appointmentDate: Date(req.body.appointmentDate),
        appointmentTime: req.body.appointmentTime,
        title: req.body.title,
        description: req.body.description,
        location: req.body.location,
        appointmentRequestStatus: req.body.appointmentRequestStatus
    };

    try {
        const result = await appointmentRequest.findByIdAndUpdate(appointmentRequestId, updatedAppointmentRequest, { new: true });

        if (result) {
            res.json("Appointment Request Updated Successfully");
        } else {
            res.status(404).json("Appointment Request Not Found");
        }
    } catch (err) {
        console.log(err);
        res.status(500).json("Error in Updating Appointment Request");
    }
});



// delete appointment request
router.route("/delete_appointment_request/:id").delete(async(req, res)=> {
    let appointmentRequestId = req.params.id;

    await appointmentRequest.findByIdAndDelete(appointmentRequestId).then(()=> {
        res.status(200).send({status:"User deleted"});
    }).catch((err)=> {
        console.log(err.messsage);
        res.status(500).send({status:"Error in delete user", error:err.messsage})
    })
})


module.exports = router;