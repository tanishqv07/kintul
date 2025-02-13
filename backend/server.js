const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("./config/db");
const { seedServices } = require("./controllers/serviceController"); 


const app = express();
app.enable("trust proxy");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: ["http://localhost:3000", "https://your-deployed-frontend.com"],
  credentials: true,
})); 

app.use((req, res, next) => {
  console.log(`Incoming Request: ${req.method} ${req.url}`);
  next();
});

// Define Routes
const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin",adminRoutes)


// Root Route
app.get("/", (req, res) => {
  res.send("Backend is working!");
});

// Ensure Database Connection & Preload Services
const PORT = process.env.PORT || 8080;

mongoose.connection.once("open", async () => {
  console.log(" MongoDB Connected");
  await seedServices(); 
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  console.error(" MongoDB Connection Failed:", err);
});
