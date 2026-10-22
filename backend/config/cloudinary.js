const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const fs = require("fs/promises");
const path = require("path");
const { randomUUID } = require("crypto");
const uploadDir = process.env.UPLOAD_DIR || path.join(__dirname, "../uploads");

// Add validation to ensure environment variables are present
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
const uploadToCloudinary = async (file, folder = "products") => {
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    if (process.env.NODE_ENV === "production") throw new Error("Cloudinary is not configured");
    await fs.mkdir(uploadDir, { recursive: true });
    const extension = file.mimetype === "image/png" ? "png" : "jpg";
    const filename = `${randomUUID()}.${extension}`;
    await fs.writeFile(path.join(uploadDir, filename), file.buffer);
    return { secure_url: `/api/uploads/${filename}` };
  }
  try {
    // Convert buffer to base64 string for Cloudinary
    const base64String = file.buffer.toString('base64');
    const dataURI = `data:${file.mimetype};base64,${base64String}`;
    
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

const uploadProductImages = (req, res, next) => {
  upload.array("images", 4)(req, res, async (error) => {
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    try {
      req.fileUrls = await Promise.all((req.files || []).map(async (file) => {
        const result = await uploadToCloudinary(file);
        return result.secure_url;
      }));
      next();
    } catch (uploadError) {
      next(uploadError);
    }
  });
};

module.exports = { uploadProductImages, uploadDir };
