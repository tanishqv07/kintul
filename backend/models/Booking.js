const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
  serviceName: String,
  customerName: String,
  customerNumber: String,
  customerAddress: String,
  status: { type: String, enum: ["pending", "cancelled", "done"], default: "pending" },
  dateTime: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Booking", BookingSchema);
