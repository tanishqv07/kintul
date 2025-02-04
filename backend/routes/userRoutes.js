const express = require("express");
const { getProfile, updateProfile } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware"); // Ensure user is authenticated

const router = express.Router();

// Get user profile (requires authentication)
router.get("/profile", authMiddleware, getProfile);

// Update user address
router.put("/profile", authMiddleware, updateProfile);

module.exports = router;
