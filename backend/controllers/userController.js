const User = require("../models/User");

// Get logged-in user profile
exports.getProfile = async (req, res) => {
  try {
    // Ensure user is authenticated
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Fetch user details (excluding password)
    const user = await User.findById(req.user.id).select("-password");
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: "Server error while fetching profile" });
  }
};

exports.updateProfile = async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
      }
  
      const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        { address: req.body.address },
        { new: true }
      ).select("-password");
  
      res.json(updatedUser);
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ error: "Server error while updating profile" });
    }
  };
  
  exports.getAllProviders = async (req, res) => {
    try {
      const providers = await User.find({ role: "Provider" }).select("-password");
      
      if (!providers.length) {
        return res.status(404).json({ message: "No providers found." });
      }
      
      res.json(providers);
    } catch (error) {
      console.error("Error fetching providers:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

