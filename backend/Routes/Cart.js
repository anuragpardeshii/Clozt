const express = require("express");
const { addToCart, getCart, removeFromCart, updateQuantity } = require("../Controller/cartController");
const verifyUser = require("../Middleware/isLoggedIn");

const router = express.Router();

router.get("/", verifyUser, getCart);
router.post("/add", verifyUser, addToCart);
router.put("/update/:productId", verifyUser, updateQuantity);
router.delete("/remove/:productId", verifyUser, removeFromCart);

module.exports = router;
