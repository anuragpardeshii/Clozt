const cloudinary = require("cloudinary").v2;
const multer = require("multer");

// Add validation to ensure environment variables are present
if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  console.error('Missing Cloudinary environment variables');
  throw new Error('Missing required Cloudinary environment variables');
}

// Configure cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true // Ensure HTTPS is used
});

// Use memory storage instead of CloudinaryStorage
const storage = multer.memoryStorage();

const upload = multer({ 
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/') && 
        ['jpg', 'jpeg', 'png'].includes(file.mimetype.split('/')[1])) {
      cb(null, true);
    } else {
      cb(new Error('Only JPG, JPEG and PNG formats are allowed'), false);
    }
  }
});

// Helper function to upload to Cloudinary
const uploadToCloudinary = async (fileBuffer, folder = "products") => {
  try {
    // Convert buffer to base64 string for Cloudinary
    const base64String = fileBuffer.toString('base64');
    const dataURI = `data:image/jpeg;base64,${base64String}`;
    
    // Use the modern promise-based approach with additional options
    const result = await cloudinary.uploader.upload(dataURI, {
      resource_type: "auto",
      folder,
      quality: "auto", // Automatic quality optimization
      fetch_format: "auto", // Automatic format selection based on browser
      transformation: [
        { width: 1000, crop: "limit" } // Resize large images
      ]
    });
    
    return result;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
};

module.exports = { upload, uploadToCloudinary, cloudinary };