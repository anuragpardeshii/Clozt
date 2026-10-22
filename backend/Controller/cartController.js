const Cart = require("../Models/Cart");
const Product = require("../Models/Product");
const mongoose = require("mongoose");

const populatedCart = (userId) => Cart.findOne({ user: userId })
  .populate({
    path: "products.product",
    select: "title description price salePrice listings images sizes category gender color",
  })
  .lean();

const getCart = async (req, res) => {
  try {
    const cart = await populatedCart(req.user._id);
    if (!cart) return res.json({ products: [], total: 0 });
    cart.products = cart.products.filter((item) => item.product);
    return res.json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const size = typeof req.body.size === "string" ? req.body.size.trim() : "";
    const quantity = req.body.quantity === undefined ? 1 : Number(req.body.quantity);
    if (!mongoose.isValidObjectId(productId) || !Number.isInteger(quantity) || quantity < 1) {
      return res.status(400).json({ message: "Valid product and quantity are required" });
    }
    if (!size) return res.status(400).json({ message: "Select a size before adding to cart" });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });
    const stock = product.sizes?.get(size) || 0;
    if (stock < 1) return res.status(400).json({ message: "Selected size is unavailable" });

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) cart = new Cart({ user: req.user._id, products: [] });
    const item = cart.products.find((entry) => entry.product.toString() === productId && entry.size === size);
    if ((item?.quantity || 0) + quantity > stock) {
      return res.status(400).json({ message: "Requested quantity exceeds available stock" });
    }
    if (item) item.quantity += quantity;
    else cart.products.push({ product: productId, size, quantity });
    await cart.save();
    return res.json(await populatedCart(req.user._id));
  } catch (error) {
    console.error("Error adding to cart:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const updateQuantity = async (req, res) => {
  try {
    const { itemId } = req.params;
    const quantity = Number(req.body.quantity);
    if (!mongoose.isValidObjectId(itemId) || !Number.isInteger(quantity) || quantity < 0) {
      return res.status(400).json({ message: "Valid cart item and quantity are required" });
    }
    const cart = await Cart.findOne({ user: req.user._id });
    const item = cart?.products.id(itemId);
    if (!item) return res.status(404).json({ message: "Cart item not found" });

    if (quantity === 0) {
      item.deleteOne();
    } else {
      const product = await Product.findById(item.product);
      if (!product || !item.size || (product.sizes?.get(item.size) || 0) < quantity) {
        return res.status(400).json({ message: "Selected size or quantity is unavailable" });
      }
      item.quantity = quantity;
    }
    await cart.save();
    return res.json(await populatedCart(req.user._id));
  } catch (error) {
    console.error("Error updating cart:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const updateSize = async (req, res) => {
  try {
    const { itemId } = req.params;
    const size = typeof req.body.size === "string" ? req.body.size.trim() : "";
    if (!mongoose.isValidObjectId(itemId) || !size) {
      return res.status(400).json({ message: "Choose a valid cart item and size" });
    }
    const cart = await Cart.findOne({ user: req.user._id });
    const item = cart?.products.id(itemId);
    if (!item) return res.status(404).json({ message: "Cart item not found" });
    const product = await Product.findById(item.product);
    const stock = product?.sizes?.get(size) || 0;
    const matchingItem = cart.products.find((entry) => entry._id.toString() !== itemId && entry.product.toString() === item.product.toString() && entry.size === size);
    if (stock < item.quantity + (matchingItem?.quantity || 0)) {
      return res.status(400).json({ message: "Selected size does not have enough stock" });
    }
    if (matchingItem) {
      matchingItem.quantity += item.quantity;
      item.deleteOne();
    } else {
      item.size = size;
    }
    await cart.save();
    return res.json(await populatedCart(req.user._id));
  } catch (error) {
    console.error("Error updating cart size:", error);
    return res.status(500).json({ message: "Could not update size" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.params;
    if (!mongoose.isValidObjectId(itemId)) {
      return res.status(400).json({ message: "Invalid cart item" });
    }
    const cart = await Cart.findOne({ user: req.user._id });
    const item = cart?.products.id(itemId);
    if (!item) return res.status(404).json({ message: "Cart item not found" });
    item.deleteOne();
    await cart.save();
    return res.json({ message: "Item removed", cart: await populatedCart(req.user._id) });
  } catch (error) {
    console.error("Error removing cart item:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getCart, addToCart, updateQuantity, updateSize, removeFromCart };
