const express = require("express");
const {
  addToCart,
  getCart,
  removeFromCart,
  updateQuantity,
  updateSize,
} = require("../Controller/cartController");
const verifyUser = require("../Middleware/isLoggedIn");

const router = express.Router();

router.get("/", verifyUser, getCart);
router.post("/add", verifyUser, addToCart);
router.put("/update/:itemId", verifyUser, updateQuantity);
router.put("/size/:itemId", verifyUser, updateSize);
router.delete("/remove/:itemId", verifyUser, removeFromCart);

module.exports = router;
