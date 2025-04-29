const multer = require("multer");
const cloudinary = require("cloudinary").v2;

// Validate Cloudinary ENV variables
if (
  !process.env.CLOUDINARY_CLOUD_NAME ||
  !process.env.CLOUDINARY_API_KEY ||
  !process.env.CLOUDINARY_API_SECRET
) {
  throw new Error("Cloudinary environment variables are not properly set");
}

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true, // Force HTTPS
});

// Multer setup using memory storage
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max file size
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/', 'application/pdf'];
    if (allowedTypes.some(type => file.mimetype.startsWith(type))) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file type'), false);
    }
  },
});

// Upload buffer to Cloudinary
const uploadToCloudinary = async (fileBuffer, mimetype, folder = "clozt-uploads", options = {}) => {
  try {
    const base64String = fileBuffer.toString('base64');
    const dataURI = `data:${mimetype};base64,${base64String}`;

    const result = await cloudinary.uploader.upload(dataURI, {
      resource_type: "auto",
      folder,
      quality: "auto",
      fetch_format: "auto",
      ...options,
    });

    console.log("Uploaded to Cloudinary:", result.secure_url);
    return result;
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    throw error;
  }
};

// Middleware generators
const uploadSingle = (fieldName) => upload.single(fieldName);
const uploadMultiple = (fieldName, maxCount = 5) => upload.array(fieldName, maxCount);
const uploadFields = (fields) => upload.fields(fields);

// Exports
module.exports = {
  upload,
  uploadToCloudinary,
  cloudinary,
  uploadSingle,
  uploadMultiple,
  uploadFields,
};