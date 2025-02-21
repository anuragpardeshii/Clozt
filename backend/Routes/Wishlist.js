const express = require("express");
const isLoggedIn = require("../Middleware/isLoggedIn");
const Wishlist = require("../Models/Wishlist");
const Product = require("../Models/Product");

const router = express.Router();

const formatWishlist = (wishlist) => ({
  ...wishlist.toObject(),
  products: wishlist.products.map((product) => ({
    _id: product._id,
    title: product.title,
    description: product.description,
    price: product.price,
    images: product.images || [], // ✅ Return all images, not just the first
  })),
});


// ✅ Add to Wishlist
router.post("/add", isLoggedIn, async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const userId = req.user.id;
    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      wishlist = new Wishlist({ user: userId, products: [] });
    }

    // ✅ Prevent duplicate entries
    if (!wishlist.products.some((p) => p.toString() === productId)) {
      wishlist.products.push(productId);
      await wishlist.save();
    }

    wishlist = await Wishlist.findOne({ user: userId }).populate({
      path: "products",
      model: "Product",
      select: "title description price images",
    });

    res.status(200).json({ message: "Added to wishlist", wishlist: formatWishlist(wishlist) });
  } catch (error) {
    // console.error("🔥 Error adding to wishlist:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// ✅ Get User Wishlist
router.get("/", isLoggedIn, async (req, res) => {
  try {
    const userId = req.user.id;
    let wishlist = await Wishlist.findOne({ user: userId }).populate({
      path: "products",
      model: "Product",
      select: "title description price images",
    });

    if (!wishlist) {
      return res.status(200).json({ wishlist: { products: [] } });
    }

    // console.log("Wishlist with populated products:", wishlist); // ✅ Debugging

    res.status(200).json({ wishlist: formatWishlist(wishlist) });
  } catch (error) {
    // console.error("🔥 Error fetching wishlist:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Remove from Wishlist
router.delete("/remove/:productId", isLoggedIn, async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id;

    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      return res.status(400).json({ message: "Wishlist not found" });
    }

    // ✅ Remove product
    wishlist.products = wishlist.products.filter((p) => p.toString() !== productId);
    await wishlist.save();

    wishlist = await Wishlist.findOne({ user: userId }).populate({
      path: "products",
      model: "Product",
      select: "title description price images",
    });

    res.status(200).json({ message: "Removed from wishlist", wishlist: formatWishlist(wishlist) });
  } catch (error) {
    // console.error("🔥 Error removing from wishlist:", error);
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;