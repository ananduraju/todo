const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema(
  {
    serviceName: { type: String, required: true },
    // ...other service details
    hotelId: { type: String, required: true },
  },
  { collection: "services" }
);

const Service = mongoose.model("ServiceSchema", ServiceSchema);

module.exports = Service;
