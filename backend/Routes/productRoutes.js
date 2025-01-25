const express = require("express");
const { addProduct, getProducts } = require("../Controller/ProductController");
const upload = require("../config/multerconfig"); // Import Multer config, NOT Cloudinary

const router = express.Router();

router.post("/newproduct", upload.array("image", 4), addProduct);
router.get("/products", getProducts); // New route to get all products

module.exports = router;