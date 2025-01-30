const express = require("express");
const { makePayment } = require("../controllers/paymentController");
const { authMiddleware, roleMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// makes payments
router.post("/", authMiddleware, roleMiddleware("Provider"), makePayment);

module.exports = router;
