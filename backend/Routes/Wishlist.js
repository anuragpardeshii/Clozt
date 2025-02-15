const express = require("express");
const isLoggedIn = require("../Middleware/isLoggedIn");
const Wishlist = require("../Models/Wishlist");

const router = express.Router();

// Add to Wishlist
router.post("/add", isLoggedIn, async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id;

    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      wishlist = new Wishlist({ userId, products: [] });
    }

    if (!wishlist.products.includes(productId)) {
      wishlist.products.push(productId);
      await wishlist.save();
      return res.status(200).json({ message: "Added to wishlist", wishlist });
    }

    res.status(400).json({ message: "Product already in wishlist" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get User Wishlist
router.get("/", isLoggedIn, async (req, res) => {
  try {
    const userId = req.user.id;
    const wishlist = await Wishlist.findOne({ userId }).populate("products");

    if (!wishlist) {
      return res.status(200).json([]);
    }

    res.status(200).json(wishlist.products);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Remove from Wishlist
router.delete("/remove/:productId", isLoggedIn, async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id;

    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      return res.status(400).json({ message: "Wishlist not found" });
    }

    wishlist.products = wishlist.products.filter((id) => id.toString() !== productId);
    await wishlist.save();

    res.status(200).json({ message: "Removed from wishlist", wishlist });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
