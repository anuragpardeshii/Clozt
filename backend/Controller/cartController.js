const Cart = require("../Models/Cart");

const getCart = async (req, res) => {
  try {
    console.log("User ID from request:", req.user?._id); // Log user ID

    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized: Please log in" });
    }

    const userId = req.user._id;
    
    // ✅ Ensure product images are included
    const cart = await Cart.findOne({ userId }).populate({
      path: "products.productId",
      select: "title description price images", // ✅ Include images
    });

    console.log("Cart found in DB:", cart); // Debugging log

    if (!cart) {
      return res.status(200).json({ products: [], total: 0 }); // Return empty cart if not found
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Add to Cart (Ensures product images are stored correctly)
const addToCart = async (req, res) => {
  try {
    const userId = req.user._id; // Extract user ID
    console.log("User ID adding to cart:", userId); // Debugging log

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: Login first" });
    }

    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, products: [], total: 0 });
    }

    const productIndex = cart.products.findIndex((p) => p.productId.toString() === productId);
    
    if (productIndex > -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }

    await cart.save();

    // ✅ Re-populate cart to include images
    const updatedCart = await Cart.findOne({ userId }).populate({
      path: "products.productId",
      select: "title description price images",
    });

    res.status(200).json(updatedCart);
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// Update item quantity
const updateQuantity = async (req, res) => {
    try {
        const { quantity } = req.body;
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.productId,
            { quantity },
            { new: true }
        );
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.productId);
        res.status(200).json({ message: "Item removed" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// ✅ Properly export all functions
module.exports = { getCart, addToCart, updateQuantity, removeFromCart };