const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.login = async (req, res) => {
  try {
    const { number, password } = req.body;
  const user = await User.findOne({ number });

  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  //validating credentials
  const isMatch = await bcrypt.compare(password,user.password)
if (!isMatch){
  return res.status(404).json({message:"invalid credentials"});
}
 const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "2h" });
  res.json({ message:"login successfully", token, user, role: user.role });
  }
   catch (error) {
    console.log(error)
    return res.status(500).json({message:"server error login not possible"})
  }
}
exports.register = async (req, res) => {
  const { name, number, password, role, address, email, profileImage, adhaarCardImage, profession } = req.body;
  try{
  const hashedPassword = await bcrypt.hash(password, 10);
  const profileImage = req.files?.profileImage ? req.files.profileImage[0].path : null;
  const adhaarCardImage = req.files?.adhaarCardImage ? req.files.adhaarCardImage[0].path : null;

  const user = new User({ name, number, password: hashedPassword, role, address, email, profileImage, adhaarCardImage, profession });
  
  await user.save();
  
  res.json({ message: "User registered successfully" });
  }
  catch (e){
    console.log("error: ",e)
    return res.json({"error": e})
  }
};
