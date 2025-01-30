const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("./config/db");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors()); //cross orienting requests

//routes
const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payment", paymentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
