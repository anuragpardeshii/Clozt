const multer = require("multer");
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true // Ensure HTTPS is used
});

// Always use memory storage
const storage = multer.memoryStorage();

// Configure file size limits and file filtering if needed
const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept images and other specific file types
    if (file.mimetype.startsWith('image/') || 
        file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file type'), false);
    }
  }
});

// Helper function to upload buffer to Cloudinary
const uploadToCloudinary = async (fileBuffer, folder = "clozt-uploads", options = {}) => {
  try {
    // Convert buffer to base64 string for Cloudinary
    const base64String = fileBuffer.toString('base64');
    const fileType = options.fileType || 'image/jpeg';
    const dataURI = `data:${fileType};base64,${base64String}`;
    
    // Use the modern promise-based approach with enhanced options
    const result = await cloudinary.uploader.upload(dataURI, {
      resource_type: "auto",
      folder,
      quality: "auto", // Automatic quality optimization
      fetch_format: "auto", // Automatic format selection based on browser
      ...options // Allow passing additional options
    });
    
    console.log("Uploaded to Cloudinary:", result.secure_url);
    return result;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
};

// Create middleware for single file upload
const uploadSingle = (fieldName) => upload.single(fieldName);

// Create middleware for multiple files upload
const uploadMultiple = (fieldName, maxCount = 5) => upload.array(fieldName, maxCount);

// Create middleware for multiple fields with files
const uploadFields = (fields) => upload.fields(fields);

module.exports = { 
  upload, 
  uploadToCloudinary, 
  cloudinary,
  uploadSingle,
  uploadMultiple,
  uploadFields
};