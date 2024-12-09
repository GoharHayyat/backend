const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv');

dotenv.config();


const mongoDBURL = process.env.DATABASE_CONNECT;
const authRouter = require('./routes/auth')
const app = express();
const cors = require("cors");
var bodyParser = require("body-parser");


// app.use("/Vehicle", express.static("Vehicle"));

app.use(cors());

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
        // parameterLimit: 1000000,
        limit: "500mb",
    })
);


const Vehicle = require("./routes/VehicleRoute");


app.use(authRouter);
app.use(Vehicle);



mongoose.connect(mongoDBURL).then((result) => {
    console.log("connected");
    app.listen(4500);
})