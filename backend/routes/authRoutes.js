const express = require("express");
const { login, register, forgotPassword, resetPassword } = require("../controllers/authController");
const upload = require("../middleware/uploadMiddleware");
const router = express.Router();

// User Registration
router.post("/register",upload.fields([{ name: "profileImage" }, { name: "adhaarCardImage" }]), register);

// User Login 
router.post("/login", login);

//generate Otp
router.post("/forgot-password", forgotPassword);

//reset password
router.post("/reset-password", resetPassword);

module.exports = router;
