const Product = require("../Models/Product");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Use memory storage instead of disk storage
const storage = multer.memoryStorage();

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
}).array('images', 10); // Allow up to 10 images

// Helper function to upload buffer to Cloudinary
const uploadToCloudinary = async (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'clozt_products' },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );
    
    uploadStream.end(buffer);
  });
};

// Middleware to handle file uploads
exports.handleProductUpload = (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: "Error uploading files", error: err.message });
    }
    
    try {
      if (req.files && req.files.length > 0) {
        const uploadPromises = req.files.map(file => uploadToCloudinary(file.buffer));
        req.fileUrls = await Promise.all(uploadPromises);
      }
      next();
    } catch (error) {
      return res.status(500).json({ message: "Error processing uploads", error: error.message });
    }
  });
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().lean();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
};

exports.getFilteredProducts = async (req, res) => {
  try {
    const { listing, category } = req.params;

    const formattedListing = listing.charAt(0).toUpperCase() + listing.slice(1);
    const formattedCategory =
      category.charAt(0).toUpperCase() + category.slice(1);

    const products = await Product.find({
      listings: { $in: [formattedListing] },
      category: formattedCategory,
    }).lean();

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching filtered products:", error);
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    let updatedData = { ...req.body };

    // Parse JSON fields if they exist
    if (updatedData.listings) {
      try {
        updatedData.listings = JSON.parse(updatedData.listings);
      } catch (e) {
        return res.status(400).json({ message: "Invalid listings format" });
      }
    }
    if (updatedData.sizes) {
      try {
        updatedData.sizes = JSON.parse(updatedData.sizes);
      } catch (e) {
        return res.status(400).json({ message: "Invalid sizes format" });
      }
    }
    if (updatedData.existingImages) {
      try {
        updatedData.existingImages = JSON.parse(updatedData.existingImages);
      } catch (e) {
        return res.status(400).json({ message: "Invalid existingImages format" });
      }
    }

    // Handle new images if any were uploaded
    if (req.fileUrls && req.fileUrls.length > 0) {
      updatedData.images = [...(updatedData.existingImages || []), ...req.fileUrls];
    }

    // Handle sale price and discount
    if (updatedData.listings && updatedData.listings.includes("Sale")) {
      // Convert sale price and discount to numbers
      updatedData.salePrice = updatedData.salePrice ? Number(updatedData.salePrice) : null;
      updatedData.discount = updatedData.discount ? Number(updatedData.discount) : null;
    } else {
      // If not on sale, remove sale price and discount
      updatedData.salePrice = null;
      updatedData.discount = null;
    }

    // Remove unnecessary fields
    delete updatedData.existingImages;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      updatedData,
      { new: true, runValidators: true }
    ).lean();

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Error updating product", error: error.message });
  }
};

exports.listings = async (req, res) => {
  try {
    const { listing } = req.params;
    const products = await Product.find({
      listings: { $in: [new RegExp("^" + listing + "$", "i")] }, // Case-insensitive search
    }).lean();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching listings:", error);
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      color,
      gender,
      category,
      sizes,
      listings,
      salePrice,
      discount,
    } = req.body;

    // Validate required fields
    if (
      !title ||
      !description ||
      !price ||
      !color ||
      !gender ||
      !category ||
      !sizes ||
      !listings
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if images are uploaded
    if (!req.fileUrls || req.fileUrls.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    const images = req.fileUrls;
    const parsedSizes = typeof sizes === "string" ? JSON.parse(sizes) : sizes;
    const parsedListings = typeof listings === "string" ? JSON.parse(listings) : listings;

    // Create a new product instance with optional sale fields
    const newProduct = new Product({
      title,
      description,
      price,
      color,
      gender,
      category,
      listings: parsedListings,
      sizes: parsedSizes,
      images,
      ...(salePrice && { salePrice: Number(salePrice) }),
      ...(discount && { discount: Number(discount) }),
    });

    await newProduct.save();

    res.status(201).json({ 
      message: "Product created successfully", 
      product: newProduct 
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      message: "Error creating product",
      error: error.message,
      stack: error.stack,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res
      .status(500)
      .json({ message: "Error deleting product", error: error.message });
  }
};
