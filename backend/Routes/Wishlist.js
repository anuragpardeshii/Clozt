const express = require("express");
const isLoggedIn = require("../Middleware/isLoggedIn");
const Wishlist = require("../Models/Wishlist");

const router = express.Router();

// ✅ Add to Wishlist
router.post("/add", isLoggedIn, async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const userId = req.user.id; // ✅ Ensure user ID is extracted correctly

    let wishlist = await Wishlist.findOne({ user: userId }).populate({
      path: "products",
      select: "title description price images", // ✅ Fix: Use 'images'
    });

    if (!wishlist) {
      wishlist = new Wishlist({ user: userId, products: [] });
    }

    // ✅ Fix: Convert product._id to string before comparison
    if (!wishlist.products.some((product) => product._id.toString() === productId)) {
      wishlist.products.push(productId);
      await wishlist.save();
    }

    // ✅ Re-populate after saving to include images
    wishlist = await Wishlist.findOne({ user: userId }).populate({
      path: "products",
      select: "title description price images",
    });

    // ✅ Map response to include the first image
    wishlist.products = wishlist.products.map((product) => ({
      ...product.toObject(),
      image: product.images.length > 0 ? product.images[0] : "", // Use the first image
    }));

    res.status(200).json({ message: "Added to wishlist", wishlist });
  } catch (error) {
    console.error("🔥 Error adding to wishlist:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// ✅ Get User Wishlist
router.get("/", isLoggedIn, async (req, res) => {
  try {
    const userId = req.user.id;
    let wishlist = await Wishlist.findOne({ user: userId }).populate({
      path: "products",
      select: "title description price images",
    });

    if (!wishlist) {
      return res.status(200).json({ wishlist: { products: [] } });
    }

    // ✅ Map response to include the first image
    wishlist.products = wishlist.products.map((product) => ({
      ...product.toObject(),
      image: product.images.length > 0 ? product.images[0] : "", // Use first image
    }));

    res.status(200).json({ wishlist });
  } catch (error) {
    console.error("🔥 Error fetching wishlist:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Remove from Wishlist
router.delete("/remove/:productId", isLoggedIn, async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id;

    let wishlist = await Wishlist.findOne({ user: userId }).populate({
      path: "products",
      select: "title description price images",
    });

    if (!wishlist) {
      return res.status(400).json({ message: "Wishlist not found" });
    }

    // ✅ Convert ObjectIDs to strings before filtering
    wishlist.products = wishlist.products.filter(
      (product) => product._id.toString() !== productId
    );

    await wishlist.save();

    // ✅ Re-populate after removing the item
    wishlist = await Wishlist.findOne({ user: userId }).populate({
      path: "products",
      select: "title description price images",
    });

    // ✅ Map response to include the first image
    wishlist.products = wishlist.products.map((product) => ({
      ...product.toObject(),
      image: product.images.length > 0 ? product.images[0] : "",
    }));

    res.status(200).json({ message: "Removed from wishlist", wishlist });
  } catch (error) {
    console.error("🔥 Error removing from wishlist:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;