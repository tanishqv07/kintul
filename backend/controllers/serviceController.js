const Service = require("../models/Service");

//  Get all services
exports.getServices = async (req, res) => {
    console.log("route hit")
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({ error: "Server error while fetching services" });
  }
};

//  Add a new service
exports.addService = async (req, res) => {
  try {
    const { title, description, imageUrl } = req.body;
    const newService = new Service({ title, description, imageUrl });
    await newService.save();
    res.status(201).json(newService);
  } catch (error) {
    console.error("Error adding service:", error);
    res.status(500).json({ error: "Server error while adding service" });
  }
};
