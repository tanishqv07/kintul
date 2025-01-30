const jwt = require("jsonwebtoken");

exports.authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

exports.roleMiddleware = (role) => (req, res, next) => {
  if (req.user.role !== role) return res.status(403).json({ message: "Forbidden" });
  next();
};
