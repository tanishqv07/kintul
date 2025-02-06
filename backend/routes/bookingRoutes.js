const express = require("express");
const { createBooking, updateBookingStatus } = require("../controllers/bookingController");
const { authMiddleware, roleMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// creates a booking
router.post("/", authMiddleware, roleMiddleware("Customer"), createBooking);

//displays user their booking history
router.get("/my", authMiddleware, async (req, res) => {
    try {
      const bookings = await Booking.find({ customerName: req.user.name });
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
// updates booking status (Pending → Done / Cancelled)
router.put("/:id/status", authMiddleware, roleMiddleware("Admin"), updateBookingStatus);

module.exports = router;
