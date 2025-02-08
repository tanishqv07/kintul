const Booking = require("../models/Booking");
const User = require("../models/User");

exports.createBooking = async (req, res) => {
  try {
    console.log("Authenticated User:", req.user);
    console.log("Request Body:", req.body); 

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { serviceId, serviceName, dateTime } = req.body;

    const booking = new Booking({
      serviceId,  
      serviceName,
      customerName: user.name, 
      customerNumber: user.number,  
      customerAddress: user.address,
      dateTime,
    });

    await booking.save();
    res.json({ message: "Booking confirmed", booking });
  } catch (error) {
    console.error("Booking Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update Booking Status
exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    await Booking.findByIdAndUpdate(req.params.id, { status });
    res.json({ message: "Booking status updated" });
  } catch (error) {
    console.error("Update Booking Error:", error);
    res.status(500).json({ message: "Failed to update status" });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({});
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};


//  Fetch user bookings based on phone number
exports.getUserBookings = async (req, res) => {
  try {
    console.log("Fetching bookings for:", req.user.number); // Debugging

    const bookings = await Booking.find({ customerNumber: req.user.number });

    if (!bookings.length) return res.status(404).json({ message: "No bookings found" });

    res.json(bookings);
  } catch (error) {
    console.error("Fetch Bookings Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
