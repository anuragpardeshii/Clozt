const Product = require("../Models/Product");
const { upload } = require("../config/cloudinary");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { title, description, price, color, gender, category, sizes } = req.body;

    if (!title || !description || !price || !color || !gender || !category || !sizes) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const images = req.files.map((file) => file.path);
    const newProduct = new Product({ title, description, price, color, gender, category, sizes, images });

    await newProduct.save();
    res.status(201).json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error: error.message });
  }
};