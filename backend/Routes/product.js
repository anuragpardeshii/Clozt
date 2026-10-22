const express = require("express");
const { uploadProductImages } = require("../config/cloudinary");
const productController = require("../Controller/ProductController");
const isAdminLoggedIn = require("../Middleware/isAdminLoggedIn");
const isLoggedIn = require("../Middleware/isLoggedIn");
const reviewController = require("../Controller/reviewController");

const router = express.Router();

router.post("/newproduct", isAdminLoggedIn, uploadProductImages, productController.createProduct);
router.get('/admin/list', isAdminLoggedIn, productController.getAdminProducts);
router.get('/admin/:id', isAdminLoggedIn, productController.getAdminProduct);
router.get("/:id/reviews", reviewController.getReviews);
router.post("/:id/reviews", isLoggedIn, reviewController.saveReview);
router.get("/:listing/:category", productController.getFilteredProducts);
router.get("/:listing", productController.listings);
router.get("/", productController.getAllProducts);
router.put("/:id", isAdminLoggedIn, uploadProductImages, productController.updateProduct);
router.delete("/:id", isAdminLoggedIn, productController.deleteProduct);

module.exports = router;
