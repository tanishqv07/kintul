const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "quality service provided" },
  imageUrl: { type: String, default: "https://via.placeholder.com/150" },
});

const Service = mongoose.model("Service", serviceSchema);
module.exports = Service;
