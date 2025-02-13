const express = require("express");
const router = express.Router();
require("dotenv").config(); // Load environment variables

router.post("/login", (req, res) => {
    const { passkey } = req.body;

    if (passkey === process.env.ADMIN_PASSKEY) {
        res.json({ success: true, message: "Authenticated successfully" });
    } else {
        res.status(401).json({ success: false, message: "Invalid passkey" });
    }
});

module.exports = router;
