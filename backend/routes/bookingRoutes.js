const express = require("express");
const { createBooking, updateBookingStatus, getUserBookings } = require("../controllers/bookingController");
const { authMiddleware, roleMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// Create a new bookings
router.post("/", authMiddleware, roleMiddleware("Customer"), createBooking);

// get individual bookings
router.get("/my", authMiddleware, getUserBookings);

//toggle route
router.put("/:id/status", authMiddleware, roleMiddleware("Admin"), updateBookingStatus);

module.exports = router;
