const multer = require("multer");

const storage = multer.memoryStorage(); // Store file buffer in memory

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Only image files are allowed"), false); // Reject if not an image
  }
};

const upload = multer({
  storage, // Use memory storage to hold file buffers
  fileFilter, // Filter for image types
  limits: { fileSize: 2 * 1024 * 1024 }, // Max size 2MB per image
});

module.exports = upload;
