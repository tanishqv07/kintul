const express = require("express");
const { createBooking, updateBookingStatus, getUserBookings, getAllBookings } = require("../controllers/bookingController");
const { authMiddleware, roleMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// Create a new bookings
router.post("/", authMiddleware, roleMiddleware("Customer"), createBooking);

// get individual bookings
router.get("/my", authMiddleware, getUserBookings);

//for admin fetch
router.get("/all", getAllBookings);

//toggle route for cancelling
router.put("/:id/status", authMiddleware, roleMiddleware("Customer"), updateBookingStatus);

//for admin to update status
router.put("/admin/:id/status", updateBookingStatus)
module.exports = router;
