const express = require("express");
const { addToCart, getCart, removeFromCart, updateQuantity } = require("../Controller/cartController.js"); // ✅ Correct syntax
const verifyUser = require("../Middleware/isLoggedIn.js");

const router = express.Router();

router.get("/", verifyUser, getCart);
router.post("/add", verifyUser, addToCart);
router.put("/update/:productId", verifyUser, updateQuantity);
router.delete("/remove/:productId", verifyUser, removeFromCart);

module.exports = router;