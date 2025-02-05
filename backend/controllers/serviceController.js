const Service = require("../models/Service");

//available services
const predefinedServices = [
  { title: "AC Repair" },
  { title: "Barber" },
  { title: "Bike Repair" },
  { title: "Carpenter" },
  { title: "Car Repair" },
  { title: "Car Wash" },
  { title: "Cook/Chef" },
  { title: "Cleaner" },
  { title: "Electrician" },
  { title: "Plumber" },
  { title: "Painter" },
  { title: "Makeup Artist" },
  { title: "Mehndi Wali" },
  { title: "Home Decorations" },
  { title: "Animal Care" },
  { title: "Tailor" },
  { title: "Labour" },
  { title: "Maid" },
]

//add default services
exports.seedServices = async () =>{
  try{
    const existingServices = await Service.find();
    if (existingServices.length === 0){
      await Service.insertMany(predefinedServices);
      console.log("service added sucessfully")
    } 
  }
  catch (err){console.log('error in seeding services')}
}
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
    const { title, description } = req.body;
    const imageUrl = req.file?.path; // Get Image URL from Cloudinary

    if (!title || !description || !imageUrl) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    const newService = new Service({ title, description, imageUrl });
    await newService.save();
    res.status(201).json(newService);
  } catch (error) {
    console.error("Error adding service:", error);
    res.status(500).json({ error: "Server error while adding service" });
  }
};

exports.deleteService = async (req,res) =>{
  try{
    const service = await Service.findByIdAndDelete(req.params.id);
    if(!service) return res.status(404).json({message:"service not found"})

    res.json({ message: "Service deleted successfully" });
  }
  catch (error) {
    console.error("Error deleting service:", error);
    res.status(500).json({ error: "Server error while deleting service" });
  }
};
