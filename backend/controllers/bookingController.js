const Booking = require("../models/Booking");

exports.createBooking = async (req, res) => {
  const { serviceName, customerName, customerAddress, customerNumber, dateTime } = req.body;
  const booking = new Booking({ serviceName, customerName, customerAddress, customerNumber, dateTime });
  await booking.save();
  res.json({ message: "Booking confirmed", booking });
};

exports.updateBookingStatus = async (req, res) => {
  const { status } = req.body;
  await Booking.findByIdAndUpdate(req.params.id, { status });
  res.json({ message: "Booking status updated" });
};
