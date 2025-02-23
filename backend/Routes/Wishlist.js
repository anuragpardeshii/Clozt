const express = require("express");
const authMiddleware = require("../Middleware/isLoggedIn");
const wishlistController = require("../Controller/wishlistController");

const router = express.Router();

router.post("/add", authMiddleware, wishlistController.addToWishlist);
router.get("/", authMiddleware, wishlistController.getWishlist);
router.delete("/remove/:productId", authMiddleware, wishlistController.removeFromWishlist);

module.exports = router;
