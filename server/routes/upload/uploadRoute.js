const multer = require("multer");
const express = require("express");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const router = express.Router();

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
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

//post request for project upload
router.post("/sendImages", upload.array("File"), (req, res) => {
  res.json({ msg: "success" });
});

//post request for project upload
router.post("/deleteImages", (req, res) => {
  execute("cd build/images && rm -rf *");
  res.json({ msg: "images deleted" });
});

//post request for project upload
router.post("/checkImages", (req, res) => {
  const directoryPath = path.join("./build", "images");
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      return res.json({ msg: "failed" });
    }
    res.json({ msg: files });
  });
});

module.exports = router;
