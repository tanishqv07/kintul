const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.login = async (req, res) => {
  const { number, password } = req.body;
  const user = await User.findOne({ number });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
  res.json({ token, user });
};

exports.register = async (req, res) => {
  const { name, number, password, role, address, email, profileImage, adhaarCardImage, profession } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, number, password: hashedPassword, role, address, email, profileImage, adhaarCardImage, profession });

  await user.save();
  res.json({ message: "User registered successfully" });
};
