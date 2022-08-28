//this node js file acts as server for 3 projects (todo , twiliosms , upload)
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const multer = require("multer");
require("dotenv").config();
let accountSid = process.env.TWILIO_ACCOUNT_SID;
let authToken = process.env.TWILIO_AUTH_TOKEN;
const { exec } = require("child_process");
const fs = require("fs");
const url = "http://ec2-3-145-162-172.us-east-2.compute.amazonaws.com:5000";

// const url = "http://192.168.1.101:3000";

//function to execute linux commands through node js
const execute = (command) => {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
};

//project twiliosms
const client = require("twilio")(accountSid, authToken, {
  lazyLoading: true,
});

//multer file storage parameters
const DIR = "./build/images";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, fileName);
  },
});
let upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

const server = app.listen(4000, () => console.log("connected"));

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

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

//post request for project upload
app.post("/sendImages", upload.array("File"), (req, res) => {
  res.json({ msg: "success" });
});

//post request for project upload
app.post("/deleteImages", (req, res) => {
  execute("cd build/images && rm -rf *");
  res.json({ msg: "images deleted" });
});

//post request for project upload
app.post("/checkImages", (req, res) => {
  const directoryPath = path.join("./build", "images");
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      return res.json({ msg: "failed" });
    }
    res.json({ msg: files });
  });
});

//post request for project twiliosms
app.post("/viewMsgs", (req, res) => {
  let logs;
  fs.readFile("logs.txt", "utf-8", (err, data) => {
    if (err) {
      res.json({ msg: "error" });
      return;
    }
    logs = data;
    res.json({ msg: logs });
  });
});

//post request for project twiliosms
app.post("/sms", (req, res) => {
  let registeredPhone = "+919447292708";
  let date = new Date();
  const { msg, phone } = req.body;
  if (phone === registeredPhone) {
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
        res.json({ msg: "success" });
      })
      .done();
    return;
  }
  res.json({ msg: "failed" });
});
