const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  serviceName: String,
  customerName: String,
  customerAddress: String,
  customerNumber: String,
  status: { type: String, enum: ["pending", "cancelled", "done"], default: "pending" },
  dateTime: Date 
});

module.exports = mongoose.model("Booking", BookingSchema);
