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
    const cart = await Cart.findOne({ user: userId }).populate({
      path: "products.product",
      select: "title description price images",
    });

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

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, products: [] });
    }

    const productIndex = cart.products.findIndex((p) => p.product.toString() === productId);
    
    if (productIndex > -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    await cart.save();

    // ✅ Re-populate cart to include images
    const updatedCart = await Cart.findOne({ user: userId }).populate({
      path: "products.product",
      select: "title description price images",
    });

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
    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    const productIndex = cart.products.findIndex((p) => p.product.toString() === productId);
    if (productIndex === -1) return res.status(404).json({ message: "Product not found in cart" });
    if (quantity === 0) {
      cart.products.splice(productIndex, 1);
    } else {
      cart.products[productIndex].quantity = quantity;
    }
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
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
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.products = cart.products.filter((p) => p.product.toString() !== productId);
    await cart.save();

    res.status(200).json({ message: "Item removed", cart });
  } catch (error) {
    console.error("Error removing item:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Properly export all functions
module.exports = { getCart, addToCart, updateQuantity, removeFromCart };
