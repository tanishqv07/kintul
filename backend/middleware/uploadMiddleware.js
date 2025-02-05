const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
require("dotenv").config(); // Load environment variables

// ✅ Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Setup Cloudinary Storage for Multer
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "kintul/uploads", // ✅ Cloudinary folder (not local)
    allowed_formats: ["jpg", "jpeg", "png", "webp"], // ✅ Restrict formats
    transformation: [{ width: 500, height: 500, crop: "limit" }], // ✅ Auto-resize images
  },
});

// ✅ File Filter - Only Allow Images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type! Only images are allowed."), false);
  }
};

// ✅ Initialize Multer
const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } }); // ✅ Limit file size to 5MB

module.exports = upload;
