const multer = require("multer");
const path = require("path");

// Determine if we're in production (Vercel)
const isProduction = process.env.VERCEL === '1';

let storage;

if (isProduction) {
  // For production, use memory storage (files won't be saved to disk)
  storage = multer.memoryStorage();
} else {
  // For development, use disk storage
  storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/"); // Ensure this directory exists
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
}

const upload = multer({ storage });

module.exports = upload;