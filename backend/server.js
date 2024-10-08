// created by : R.M.S.D. Rathnayake - IT22140616

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");

// port number
const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

// database link
const URL = process.env.MONGODB_URL;

// connect to mongoDB
mongoose.connect(URL);

// opening connection
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Mongodb Connection Success!!..");
});

// runnung on port
app.listen(PORT, () => {
    console.log(`Server is up and running on port : ${PORT}`);
});

//access to route for appointment request
const appointmentRequestRouter = require("./routes/routes_apm_appointment_request.js");
app.use("/appointmentrequest", appointmentRequestRouter);

//access to route for appointment
const appointmentRouter = require("./routes/routes_apm_appointment.js");
app.use("/appointment", appointmentRouter);

//access to route for client-portal
const clientRouter = require("./routes/routes_cli_clients.js");
app.use("/client", clientRouter);

//access to route for messages
const messageRouter = require("./routes/routes_message.js");
app.use("/message", messageRouter);

//route to search case & deed in client_portal
const searchRoutes = require("./routes/routes_cli_search.js");
app.use("/api/search", searchRoutes);

// Route for new cases
const newcaseRouter = require("./routes/routes_lcm_newcase.js");
app.use("/case", newcaseRouter);

// Route for deeds
const deedsRouter = require("./routes/routes_deed.js");
app.use("/deeds", deedsRouter);
app.use("/clients", deedsRouter);
app.use("/lawyers", deedsRouter);

