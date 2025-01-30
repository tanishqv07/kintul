const express = require("express");
const { createBooking, updateBookingStatus } = require("../controllers/bookingController");
const { authMiddleware, roleMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// creates a booking
router.post("/", authMiddleware, roleMiddleware("Customer"), createBooking);

// updates booking status (Pending → Done / Cancelled)
router.put("/:id/status", authMiddleware, roleMiddleware("Admin"), updateBookingStatus);

module.exports = router;
