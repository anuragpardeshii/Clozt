const express = require("express");
const router = express.Router();
const productController = require("../Controller/ProductController");

// Route to add a product
router.post("/add", productController.addProduct);

module.exports = router;
