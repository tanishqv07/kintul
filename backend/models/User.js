const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  address: String,
  number: { type: String, unique: true, required: true },
  email: { type: String, unique: true, sparse: true }, 
  password: String,
  profileImage: String, 
  adhaarCardImage: String,
  profession: String, 
  role: { type: String, enum: ["Admin", "Provider", "Customer"], required: true },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
});

module.exports = mongoose.model("User", UserSchema);
