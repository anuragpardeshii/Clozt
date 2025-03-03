const Product = require("../Models/Product");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
};

exports.getFilteredProducts = async (req, res) => {
  try {
    const { listing, category } = req.params;

    const formattedListing = listing.charAt(0).toUpperCase() + listing.slice(1);
    const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);

    const products = await Product.find({
      listings: { $in: [formattedListing] },
      category: formattedCategory,
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
};


exports.listings = async (req, res) => {
  try {
    const { listing } = req.params;
    const products = await Product.find({
      listings: { $in: [new RegExp("^" + listing + "$", "i")] }, // Case-insensitive search
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
};


exports.createProduct = async (req, res) => {
  try {
    // console.log("Request Body:", req.body);
    // console.log("Uploaded Files:", req.files);

    const { title, description, price, color, gender, category, sizes, listings } = req.body;

    // Validate required fields
    if (!title || !description || !price || !color || !gender || !category || !sizes || !listings) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if images are uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    // Convert uploaded images to array of Cloudinary URLs
    const images = req.files.map((file) => file.path);

    // console.log("Received sizes:", sizes);
    // console.log("Received listings:", listings);

    // Ensure sizes and listings are properly parsed
    const parsedSizes = typeof sizes === "string" ? JSON.parse(sizes) : sizes;
    const parsedListings = typeof listings === "string" ? JSON.parse(listings) : listings;

    // Create a new product instance
    const newProduct = new Product({
      title,
      description,
      price,
      color,
      gender,
      category,
      listings: parsedListings, // Ensure listings is an array
      sizes: parsedSizes, // Ensure sizes is an object
      images,
    });

    // Save product to database
    await newProduct.save();

    res.status(201).json({ message: "Product created successfully", product: newProduct });

  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ 
      message: "Error creating product", 
      error: error.message,
      stack: error.stack // For debugging
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
    res.status(500).json({ message: "Error deleting product", error: error.message });
  }
};
