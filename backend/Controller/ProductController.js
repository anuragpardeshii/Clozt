const Product = require("../models/Product");
const cloudinary = require("../config/cloudinaryConfig");

const addProduct = async (req, res) => {
  try {
    const files = req.files; // Multer places files in req.files
    console.log(req.files); // To see what is being uploaded

    // Ensure files are present
    if (!files || files.length === 0) {
      return res.status(400).json({ error: "No files uploaded." });
    }

    const uploadedImages = [];

    // Upload images to Cloudinary (using file buffer, not file path)
    for (const file of files) {
      // Upload the buffer to Cloudinary
      const result = await cloudinary.uploader.upload_stream(
        {
          folder: "products", // You can customize the folder name
          resource_type: "image", // Explicitly mention that it's an image
        },
        (error, result) => {
          if (error) {
            return res.status(500).json({ error: error.message });
          }
          uploadedImages.push(result.secure_url); // Collect Cloudinary URLs
        }
      );

      result.end(file.buffer); // Pass the file buffer to Cloudinary's upload stream
    }

    // Prepare the product data to be saved in the database
    const productData = {
      ...req.body, // The form data, including text fields
      sizes: JSON.parse(req.body.sizes), // Parse the sizes object from JSON
      images: uploadedImages, // Array of Cloudinary image URLs
    };

    // Create a new product in the database
    const newProduct = await Product.create(productData);
    res.status(201).json(newProduct); // Respond with the newly created product
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ error: err.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products from DB
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { addProduct, getProducts };