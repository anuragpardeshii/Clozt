const express = require("express");
const { upload } = require("../config/cloudinary");
const Product = require("../Models/Product");

const router = express.Router();

router.post("/newproduct", upload.array("images", 4), async (req, res) => {
  try {
    console.log("Received Files:", req.files); // Debugging

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No images uploaded" });
    }

    // Cloudinary Image URLs
    const images = req.files.map((file) => file.path);
    console.log("Stored Images:", images);

    const newProduct = new Product({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      color: req.body.color,
      gender: req.body.gender,
      category: req.body.category,
      listings: JSON.parse(req.body.listings),
      sizes: JSON.parse(req.body.sizes),
      images,
    });

    await newProduct.save();
    res.status(201).json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    console.error("Error uploading product:", error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

module.exports = router;
