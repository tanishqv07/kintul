const Booking = require("../models/Booking");

exports.createBooking = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { serviceName, dateTime } = req.body;

    const booking = new Booking({
      serviceName,
      customerName: user.name, 
      customerAddress: user.address,
      customerNumber: user.number,
      dateTime,
    });

    await booking.save();
    res.json({ message: "Booking confirmed", booking });
  } catch (error) {
    console.error("Booking Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateBookingStatus = async (req, res) => {
  const { status } = req.body;
  await Booking.findByIdAndUpdate(req.params.id, { status });
  res.json({ message: "Booking status updated" });
};
