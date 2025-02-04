const jwt = require("jsonwebtoken");
const User = require("../models/User")

exports.authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access Denied, invalid Token"});

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    res.status(400).json({ message: "Unauthorized" });
  }
};

exports.roleMiddleware = (role) => (req, res, next) => {
  if (req.user.role !== role) return res.status(403).json({ message: "Forbidden" });
  next();
};
