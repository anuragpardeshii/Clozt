const Cart = require("../Models/Cart");

// ✅ Get Cart with Populated Products
const getCart = async (req, res) => {
  try {
    console.log("User ID from request:", req.user?._id); // Debugging log

    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized: Please log in" });
    }

    const userId = req.user._id;
    
    // ✅ Ensure product images are included
    const cart = await Cart.findOne({ user: userId })
      .populate({
        path: "products.product",
        select: "title description price images",
      })
      .lean(); // Use lean() for better performance

    console.log("Cart found in DB:", cart); // Debugging log

    if (!cart) {
      return res.status(200).json({ products: [], total: 0 });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Add to Cart with Proper Product References
const addToCart = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized: Login first" });
    }

    const userId = req.user._id;
    const { productId, quantity } = req.body;

    // Use findOneAndUpdate for atomic operation
    const cart = await Cart.findOneAndUpdate(
      { user: userId },
      {},
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    const productIndex = cart.products.findIndex((p) => p.product.toString() === productId);
    
    if (productIndex > -1) {
      // Update existing product quantity
      await Cart.findOneAndUpdate(
        { user: userId, "products.product": productId },
        { $inc: { "products.$.quantity": quantity } },
        { new: true }
      );
    } else {
      // Add new product to cart
      await Cart.findOneAndUpdate(
        { user: userId },
        { $push: { products: { product: productId, quantity } } },
        { new: true }
      );
    }

    // ✅ Re-populate cart to include images
    const updatedCart = await Cart.findOne({ user: userId })
      .populate({
        path: "products.product",
        select: "title description price images",
      })
      .lean();

    res.status(200).json(updatedCart);
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Update Item Quantity Correctly
const updateQuantity = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized: Login first" });
    }
    
    const userId = req.user._id;
    
    if (quantity === 0) {
      // Remove the product if quantity is 0
      await Cart.findOneAndUpdate(
        { user: userId },
        { $pull: { products: { product: productId } } },
        { new: true }
      );
    } else {
      // Update the quantity
      await Cart.findOneAndUpdate(
        { user: userId, "products.product": productId },
        { $set: { "products.$.quantity": quantity } },
        { new: true }
      );
    }
    
    const updatedCart = await Cart.findOne({ user: userId })
      .populate({
        path: "products.product",
        select: "title description price images",
      })
      .lean();
      
    if (!updatedCart) return res.status(404).json({ message: "Cart not found" });
    
    res.status(200).json(updatedCart);
  } catch (error) {
    console.error("Error updating quantity:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Remove Item from Cart Correctly
const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized: Login first" });
    }

    const userId = req.user._id;
    
    // Use atomic operation to remove item
    const updatedCart = await Cart.findOneAndUpdate(
      { user: userId },
      { $pull: { products: { product: productId } } },
      { new: true }
    )
    .populate({
      path: "products.product",
      select: "title description price images",
    })
    .lean();

    if (!updatedCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({ message: "Item removed", cart: updatedCart });
  } catch (error) {
    console.error("Error removing item:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Properly export all functions
module.exports = { getCart, addToCart, updateQuantity, removeFromCart };
