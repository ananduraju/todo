//this node js file acts as server for 3 projects (todo , twiliosms , upload)
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();
const url = "http://ec2-3-145-162-172.us-east-2.compute.amazonaws.com:5000";
const hotelRoute = require("./routes/hotel/hotelRoute");
const uploadRoute = require("./routes/upload/uploadRoute");
const twilioRoute = require("./routes/twilio/twilioRoute");


// const url = "http://192.168.1.101:3000";

app.listen(4000, () => console.log("connected"));

const whitelist = ["http://localhost:4000", url];

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error());
    }
  },
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "build")));
app.use("/hotel", hotelRoute);
app.use("/upload", uploadRoute);
app.use("/hotel", twilioRoute);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
