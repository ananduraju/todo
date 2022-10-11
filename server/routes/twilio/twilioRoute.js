const express = require("express");
const router = express.Router();
require("dotenv").config();
const fs = require("fs");
let accountSid = process.env.TWILIO_ACCOUNT_SID;
let authToken = process.env.TWILIO_AUTH_TOKEN;

router.get("/", async (req, res) => {
  res.send("hello");
});

//project twiliosms
const client = require("twilio")(accountSid, authToken, {
  lazyLoading: true,
});

//post request for project twiliosms
router.post("/viewMsgs", (req, res) => {
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
router.post("/sms", (req, res) => {
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

module.exports = router;
