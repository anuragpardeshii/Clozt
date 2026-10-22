const Order = require("../Models/Order");
const Cart = require("../Models/Cart");
const Coupon = require("../Models/Coupon");
const mongoose = require("mongoose");
const { getItemPrice, evaluateCoupon } = require("../services/couponPricing");
const pagination = require('../services/pagination');

exports.createOrder = async (req, res) => {
  try {
    const { deliveryNotes, checkoutKey, addressId } = req.body;
    if (typeof checkoutKey !== "string" || checkoutKey.length < 16 || checkoutKey.length > 128) {
      return res.status(400).json({ message: "Invalid checkout request" });
    }
    const existingOrder = await Order.findOne({ user: req.user._id, checkoutKey });
    if (existingOrder) return res.json({ order: existingOrder });
    const addressFields = ["address", "city", "state", "postalCode", "country"];
    let shippingAddress = req.body.shippingAddress;
    if (addressId !== undefined) {
      if (!mongoose.isValidObjectId(addressId)) return res.status(400).json({ message: "Invalid saved address" });
      const savedAddress = req.user.addresses.id(addressId);
      if (!savedAddress) return res.status(404).json({ message: "Saved address not found" });
      shippingAddress = savedAddress;
    }
    if (!shippingAddress || addressFields.some((field) => typeof shippingAddress[field] !== "string" || !shippingAddress[field].trim())) {
      return res.status(400).json({ message: "Complete shipping address is required" });
    }

    const cart = await Cart.findOne({ user: req.user._id }).populate("products.product");
    if (!cart || cart.products.every((item) => !item.product)) {
      return res.status(400).json({ message: "Cart is empty" });
    }
    const availableItems = cart.products.filter((item) => item.product);
    if (availableItems.some((item) => !Number.isInteger(item.quantity) || item.quantity < 1)) {
      return res.status(400).json({ message: "Cart contains an invalid quantity" });
    }
    if (availableItems.some((item) => !item.size)) {
      return res.status(400).json({ message: "Select a size for each cart item before checkout" });
    }
    if (availableItems.some((item) => (item.product.sizes?.get(item.size) || 0) < item.quantity)) {
      return res.status(400).json({ message: "A cart item is no longer available in the selected size or quantity" });
    }

    const items = availableItems.map((item) => {
      const product = item.product;
      const price = getItemPrice(product);
      return {
        product: product._id,
        size: item.size,
        quantity: item.quantity,
        price,
        name: product.title,
        image: product.images[0],
      };
    });
    const subtotalAmount = items.reduce((total, item) => total + item.price * item.quantity, 0);
    const couponCode = typeof req.body.couponCode === "string" ? req.body.couponCode.trim().toUpperCase() : "";
    let discountAmount = 0;
    if (couponCode) {
      const coupon = await Coupon.findOne({ code: couponCode });
      const result = evaluateCoupon(coupon, subtotalAmount);
      if (result.error) return res.status(400).json({ message: result.error });
      discountAmount = result.discount;
    }
    const totalAmount = Math.round((subtotalAmount - discountAmount) * 100) / 100;
    const order = await Order.create({
      user: req.user._id,
      checkoutKey,
      items,
      subtotalAmount,
      discountAmount,
      couponCode: couponCode || undefined,
      totalAmount,
      shippingAddress: Object.fromEntries(addressFields.map((field) => [field, shippingAddress[field].trim()])),
      paymentMethod: "Cash on Delivery",
      deliveryNotes: typeof deliveryNotes === "string" ? deliveryNotes.trim() : undefined,
    });
    await Cart.updateOne({ _id: cart._id }, { $set: { products: [] } });
    return res.status(201).json({ order });
  } catch (error) {
    if (error.code === 11000 && req.body.checkoutKey) {
      const existingOrder = await Order.findOne({ user: req.user._id, checkoutKey: req.body.checkoutKey });
      if (existingOrder) return res.json({ order: existingOrder });
    }
    console.error("Error creating order:", error);
    return res.status(500).json({ message: "Could not create order" });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 }).lean();
    return res.json({ orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({ message: "Could not fetch orders" });
  }
};

exports.getAdminOrders = async (req, res) => {
  try {
    const { page, limit, skip } = pagination(req.query);
    const allowed = ['Pending', 'Paid', 'Processing', 'Packed', 'Dispatched', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled', 'Refunded'];
    const filter = req.query.status && allowed.includes(req.query.status) ? { status: req.query.status } : {};
    const [orders, total] = await Promise.all([
      Order.find(filter).sort({ createdAt: -1, _id: -1 }).skip(skip).limit(limit).populate('user', 'username email').lean(),
      Order.countDocuments(filter),
    ]);
    return res.json({ orders, total, page, limit, pages: Math.max(1, Math.ceil(total / limit)) });
  } catch (error) {
    console.error("Error fetching admin orders:", error);
    return res.status(500).json({ message: "Could not fetch orders" });
  }
};

exports.updateAdminStatus = async (req, res) => {
  const nextStatus = req.body?.status;
  const sequence = ['Pending', 'Paid', 'Processing', 'Packed', 'Dispatched', 'Shipped', 'Out for Delivery', 'Delivered'];
  if (!mongoose.isValidObjectId(req.params.id) || ![...sequence, 'Cancelled', 'Refunded'].includes(nextStatus)) {
    return res.status(400).json({ message: 'Invalid order or status' });
  }
  try {
    const current = await Order.findById(req.params.id).select('status paymentMethod').lean();
    if (!current) return res.status(404).json({ message: 'Order not found' });
    const allowed = nextStatus === 'Cancelled'
      ? !['Delivered', 'Cancelled', 'Refunded'].includes(current.status)
      : nextStatus === 'Refunded'
        ? current.status === 'Delivered' && current.paymentMethod !== 'Cash on Delivery'
      : sequence.indexOf(nextStatus) > sequence.indexOf(current.status) && !['Cancelled', 'Refunded'].includes(current.status) && !(nextStatus === 'Paid' && current.paymentMethod === 'Cash on Delivery');
    if (!allowed) return res.status(400).json({ message: 'This status change is not allowed' });
    const order = await Order.findOneAndUpdate(
      { _id: req.params.id, status: current.status },
      { $set: { status: nextStatus }, $push: { statusHistory: { status: nextStatus, changedBy: req.user._id, changedAt: new Date() } } },
      { new: true, runValidators: true }
    ).populate('user', 'username email').lean();
    if (!order) return res.status(409).json({ message: 'Order changed; refresh and try again' });
    return res.json({ order });
  } catch (error) {
    console.error('Status update error:', error);
    return res.status(500).json({ message: 'Could not update order status' });
  }
};
