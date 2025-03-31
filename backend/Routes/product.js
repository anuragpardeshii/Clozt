const express = require("express");
const { upload } = require("../config/cloudinary");
const productController = require("../Controller/ProductController");
const isAdminLoggedIn = require("../Middleware/isAdminLoggedIn");

const router = express.Router();

router.post("/newproduct", isAdminLoggedIn, upload.array("images", 4), productController.createProduct);
router.get("/:listing/:category", productController.getFilteredProducts);
router.get("/:listing", productController.listings);
router.get("/", productController.getAllProducts);
router.put("/:id", isAdminLoggedIn, upload.array("images", 4), productController.updateProduct);
router.delete("/:id", isAdminLoggedIn, productController.deleteProduct);

module.exports = router;
