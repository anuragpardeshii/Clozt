const Product = require("../Models/Product");

// Add a new product
exports.addProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      color,
      gender,
      category,
      listings,
      quantity,
      images,
    } = req.body;

    const newProduct = new Product({
      title,
      description,
      price,
      color,
      gender,
      category,
      listings,
      quantity,
      images,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({ message: "Product added successfully", product: savedProduct });
  } catch (error) {
    res.status(500).json({ error: "Error adding product", details: error.message });
  }
};
