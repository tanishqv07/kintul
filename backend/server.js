const express = require("express");
require('dotenv').config()

const cors = require("cors");
const mongoose = require("./config/db");



const app = express();
app.enable("trust proxy");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); //cross orienting requests

//routes
const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/services",serviceRoutes);
//debug
app.use((req, res, next) => {
    console.log(`Incoming Request: ${req.method} ${req.url}`);
    next();
  });

app.get("/", (req, res) => {
    res.send("Backend is working!");
  });
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
