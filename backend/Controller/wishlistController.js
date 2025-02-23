const Wishlist = require("../Models/Wishlist");
const Product = require("../Models/Product");

/**
 * @desc Format wishlist response
 */
const formatWishlist = (wishlist) => ({
  ...wishlist.toObject(),
  products: wishlist.products.map((product) => ({
    _id: product._id,
    title: product.title,
    description: product.description,
    price: product.price,
    images: product.images || [],
  })),
});

/**
 * @desc Add a product to the wishlist
 */
exports.addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const userId = req.user.id;
    const productExists = await Product.findById(productId);
    if (!productExists) {
      return res.status(404).json({ message: "Product not found" });
    }

    let wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) {
      wishlist = new Wishlist({ user: userId, products: [] });
    }

    if (!wishlist.products.includes(productId)) {
      wishlist.products.push(productId);
      await wishlist.save();
    }

    wishlist = await Wishlist.findOne({ user: userId }).populate("products", "title description price images");

    return res.status(200).json({ message: "Added to wishlist", wishlist: formatWishlist(wishlist) });
  } catch (error) {
    console.error("🔥 Error adding to wishlist:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

/**
 * @desc Get user's wishlist
 */
exports.getWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    let wishlist = await Wishlist.findOne({ user: userId }).populate("products", "title description price images");

    return res.status(200).json({ wishlist: wishlist ? formatWishlist(wishlist) : { products: [] } });
  } catch (error) {
    console.error("🔥 Error fetching wishlist:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * @desc Remove a product from the wishlist
 */
exports.removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id;
    
    let wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    wishlist.products = wishlist.products.filter((p) => p.toString() !== productId);
    await wishlist.save();

    wishlist = await Wishlist.findOne({ user: userId }).populate("products", "title description price images");

    return res.status(200).json({ message: "Removed from wishlist", wishlist: formatWishlist(wishlist) });
  } catch (error) {
    console.error("🔥 Error removing from wishlist:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};
