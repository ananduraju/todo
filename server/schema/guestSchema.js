const mongoose = require("mongoose");

const GuestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    hotelId: { type: String, required: true },
  },
  { collection: "guests" }
);

const Guest = mongoose.model("GuestSchema", GuestSchema);

module.exports = Guest;
