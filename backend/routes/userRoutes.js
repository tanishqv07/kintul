const express = require("express");
const { getProfile, updateProfile, getAllProviders } = require("../controllers/userController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

//routes
router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);
router.get("/provider",getAllProviders)
module.exports = router;
