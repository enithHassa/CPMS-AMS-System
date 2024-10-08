const router = require("express").Router();
let Client = require("../models/model_cli_clients");

// Add a new client with email and password validation
router.route("/addClient").post((req, res) => {
    const { fname, lname, nic, address, district, province, phone, email, password } = req.body;

    // Validate that email and password are provided
    if (!email || !password) {
        return res.status(400).json("Email and password are required.");
    }

    const newClient = new Client({
        fname,
        lname,
        nic,
        address,
        district,
        province,
        phone,
        email,
        password
    });

    newClient.save().then(() => {
        res.json("Client Added");
    }).catch((err) => {
        console.log(err);
        res.status(500).json("Error adding client");
    });
});

// Update client details (other fields can be added later)
router.route("/updateClient/:id").put(async (req, res) => {
    let userId = req.params.id;

    // Destructure the fields from req.body
    const { fname, lname, nic, address, district, province, phone, email, password } = req.body;

    // Only update the fields that are provided
    const updateClient = {};
    if (fname) updateClient.fname = fname;
    if (lname) updateClient.lname = lname;
    if (nic) updateClient.nic = nic;
    if (address) updateClient.address = address;
    if (district) updateClient.district = district;
    if (province) updateClient.province = province;
    if (phone) updateClient.phone = phone;
    if (email) updateClient.email = email;
    if (password) updateClient.password = password;

    try {
        await Client.findByIdAndUpdate(userId, updateClient);
        res.status(200).send({ status: "Client updated" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error updating client", error: err.message });
    }
});


router.route("/").get((req,res)=> {

    Client.find().then((clients)=>{
        res.json(clients)
    }).catch((err)=>{
        console.log(err)
    })

});

router.route("/updateClient/:id").put(async (req, res) => {
    let userId = req.params.id;

    // Destructure the fields from req.body
    const { fname, lname, nic, address, district, province, phone, email, password } = req.body;

    const updateClient = {
        fname,
        lname,
        nic,
        address,
        district,
        province,
        phone,
        email,
        password
    };

    try {
        await Client.findByIdAndUpdate(userId, updateClient);
        res.status(200).send({ status: "user updated" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "error with updating data", error: err.message });
    }
});


router.route("/deleteClient/:id").delete(async (req, res)=> {
    let userId = req.params.id;

    await Client.findByIdAndDelete(userId)
    .then(()=> {
        res.status(200).send({status : "user deleted"});
    }).catch((err)=> {
        console.log(err.message);
        res.status(500).send({status: "error with delete user", error: err.message});
    })
});

router.route("/getClient/:id").get(async (req, res) => {
    let userId = req.params.id;

    try {
        const user = await Client.findById(userId);
        if (user) {
            res.status(200).send({ status: "user fetched", user: user });
        } else {
            res.status(404).send({ status: "user not found" });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ status: "Error with get user", error: err.message });
    }
});


router.route("/loginClient").post(async (req, res) => {
    const { email, password } = req.body;

    try {
        const client = await Client.findOne({ email, password });

        if (!client) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        res.status(200).json({ user: client });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

router.get('/getClient/:id', async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        if (!client) return res.status(404).json({ message: "Client not found" });
        res.json({ user: client });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const nodemailer = require("nodemailer");
// Define the email route
router.post("/sendEmail", (req, res) => {
    const { email, password } = req.body;

    // Set up transporter using your email service (e.g., Gmail, SMTP)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'enithhassa18@gmail.com',  // Replace with your email
            pass: '1361psvm'    // Replace with your email password
        }
    });

    const mailOptions = {
        from: 'enithhassa18@gmail.com',     // Replace with your email
        to: email,                        // User's email
        subject: 'Your Login Credentials',
        text: `Here are your login credentials:\n\nEmail: ${email}\nPassword: ${password}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Email sent successfully!');
    });
});

module.exports = router;
