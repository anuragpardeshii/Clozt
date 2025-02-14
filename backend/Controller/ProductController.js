const Product = require("../Models/Product");
const cloudinary = require("../config/cloudinary");

const addProduct = async (req, res) => {
  try {
    const files = req.files; // Multer stores files in req.files
    console.log(req.files); // Debugging output

    if (!files || files.length === 0) {
      return res.status(400).json({ error: "No files uploaded." });
    }

    // Upload images to Cloudinary using Promises
    const uploadPromises = files.map((file) => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "products",
            resource_type: "image",
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result.secure_url);
            }
          }
        );

        uploadStream.end(file.buffer); // Send the file buffer to Cloudinary
      });
    });

    // Wait for all images to be uploaded
    const uploadedImages = await Promise.all(uploadPromises);

    // Prepare product data
    const productData = {
      ...req.body,
      sizes: JSON.parse(req.body.sizes), // Ensure sizes is parsed correctly
      images: uploadedImages, // Store Cloudinary URLs
    };

    // Save product to the database
    const newProduct = await Product.create(productData);
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { addProduct, getProducts };