const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
require("dotenv").config(); // Load environment variables

//Configure Cloud for images
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Setup Cloudinary Storage 
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "kintul/uploads", // Change this to your project name
      format: file.mimetype.split("/")[1], // Automatically detect format
      public_id: `${Date.now()}-${file.originalname}`, // Unique filename
    };
  },
});

//Security reasons
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type! Only images are allowed."), false);
  }
};

//Initialize Multer with Cloudinary Storage & File Filter
const upload = multer({ storage, fileFilter });

module.exports = upload;
