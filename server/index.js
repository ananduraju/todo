const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();
let accountSid = process.env.TWILIO_ACCOUNT_SID;
let authToken = process.env.TWILIO_AUTH_TOKEN;
const fs = require("fs");
const url = "http://ec2-3-145-162-172.us-east-2.compute.amazonaws.com:4000";

// const url = "http://192.168.1.100:3000";

const client = require("twilio")(accountSid, authToken, {
  lazyLoading: true,
});

const server = app.listen(4000, () => console.log("connected"));

const whitelist = ["http://localhost:3000", url];

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

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.post("/viewMsgs", (req, res) => {
  let logs;
  fs.readFile("logs.txt", "utf-8", (err, data) => {
    if (err) {
      res.json({ msg: "error" });
      return;
    }
    // console.log(data);
    logs = data;
    res.json({ msg: logs });
  });
});

app.post("/sms", (req, res) => {
  let registeredPhone = "+919447292708";
  let date = new Date();
  const { msg, phone } = req.body;
  if (phone === registeredPhone) {
    // console.log("sms", msg);
    let log = `{"log":"${msg}","phone":"${phone}","date":"${date.toLocaleString(
      "en-US",
      {
        timeZone: "IST",
      }
    )}"}$`;
    fs.appendFile("logs.txt", log, (err) => {
      if (err) {
        console.error(err);
      }
      // done!
    });
    client.messages
      .create({
        body: msg,
        messagingServiceSid: "MG4671da8b31af8bc9bc82081c74909b51",
        to: registeredPhone,
      })
      .then((message) => {
        console.log(message);
        res.json({ msg: "success" });
      })
      .done();
    return;
  }
  // console.log("invalid phone");
  res.json({ msg: "failed" });
});
