const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Fix the variable name
  api_key: process.env.CLOUDINARY_API_KEY, // Fix the variable name
  api_secret: process.env.CLOUDINARY_API_SECRET, // Fix the variable name
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "products",
    allowedFormats: ["jpg", "jpeg", "png"],
  },
});

const upload = multer({ storage });

module.exports = { upload };