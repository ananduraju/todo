const mongoose = require("mongoose");

const chainSchema = mongoose.Schema({
  branchName: { type: String, required: true, unique: false },
  address: { type: String, required: true, unique: false },
});

const HotelSchema = new mongoose.Schema(
  {
    hotel: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    chains: [chainSchema],
  },
  { collection: "Hotels" }
);

const Hotel = mongoose.model("HotelSchema", HotelSchema);

module.exports = Hotel;
