const express = require("express");
const { login, register } = require("../controllers/authController");
const upload = require("../middleware/uploadMiddleware");
const router = express.Router();

// User Registration
router.post("/register",upload.fields([{ name: "profileImage" }, { name: "adhaarCardImage" }]), register);

// User Login 
router.post("/login", login);

module.exports = router;
