const express = require("express");
const router = express.Router();
require("dotenv").config();
const Hotel = require("../../schema/hotelSchema");
const Guest = require("../../schema/guestSchema");
const Service = require("../../schema/serviceSchema");

// fetch all hotels
router.get("/", async (req, res) => {
  const result = await Hotel.find();
  res.json(result);
});

// fetch guests
router.get("/guests", async (req, res) => {
  // hotel id passed through header
  const hotelId = req.get("hotelId");
  const result = await Guest.find({ hotelId });
  res.json(result);
});

// add guests
router.post("/guests", async (req, res) => {
  // hotel id passed through header
  const hotelId = req.get("hotelId");
  const { name, phone, address } = req.body;

  const result = await Guest.create({ name, phone, address, hotelId });
  res.json(result);
});

// fetch services
router.get("/service", async (req, res) => {
  // hotel id passed through header
  const hotelId = req.get("hotelId");
  const result = await Service.find({ hotelId });
  res.json(result);
});

// add services
router.post("/service", async (req, res) => {
  // hotel id passed through header
  const hotelId = req.get("hotelId");
  const { serviceName /*other details*/ } = req.body;
  const result = await Service.create({ serviceName, hotelId });
  res.json(result);
});

// fetch chains
router.get("/chains", async (req, res) => {
  // hotel id passed through header
  const hotelId = req.get("hotelId");
  const result = await Hotel.findOne({ hotelId });
  res.json(result.chains);
});

// add chains
router.post("/chains", async (req, res) => {
  // hotel id passed through header
  const hotelId = req.get("hotelId");
  const { chains } = req.body;
  // chains : [...{branchName , address}] array of chains
  const result = await Hotel.updateOne(
    { _id: hotelId },
    { $push: { chains: chains } }
  );
  res.json(result);
});

// create hotel
router.post("/create", async (req, res) => {
  const { hotel, phone, chains } = req.body;
  // chains : [...{branchName , address}] array of chains
  const result = await Hotel.create({ hotel, phone, chains });
  res.json(result);
});

// Total count of guests in a hotel
router.get("/guestCount", async (req, res) => {
  // hotel id passed through header
  const hotelId = req.get("hotelId");
  const result = await Guest.find({ hotelId });
  res.json(result);
});

module.exports = router;
