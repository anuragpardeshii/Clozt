const Coupon = require("../Models/Coupon");
const Cart = require("../Models/Cart");
const { getCartSubtotal, evaluateCoupon } = require("../services/couponPricing");

const normalizeCode = (code) => typeof code === "string" ? code.trim().toUpperCase() : "";
const invalidInput = (message) => {
  const error = new Error(message);
  error.name = "CouponInputError";
  throw error;
};

const couponInput = (body = {}) => {
  const code = normalizeCode(body.code);
  const value = Number(body.value);
  const minimumSpend = Number(body.minimumSpend ?? 0);
  const maxDiscount = body.maxDiscount === "" || body.maxDiscount == null ? null : Number(body.maxDiscount);
  const expiresAt = new Date(body.expiresAt);
  if (!/^[A-Z0-9_-]{3,24}$/.test(code)) invalidInput("Code must be 3–24 letters, numbers, dashes, or underscores");
  if (!["percent", "fixed"].includes(body.kind)) invalidInput("Choose a valid discount type");
  if (!Number.isFinite(value) || value <= 0 || (body.kind === "percent" && value > 100)) invalidInput("Enter a valid discount value");
  if (!Number.isFinite(minimumSpend) || minimumSpend < 0) invalidInput("Enter a valid minimum spend");
  if (maxDiscount !== null && (!Number.isFinite(maxDiscount) || maxDiscount <= 0)) invalidInput("Enter a valid maximum discount");
  if (Number.isNaN(expiresAt.getTime())) invalidInput("Choose an expiration date");
  if (body.active !== false && expiresAt <= new Date()) invalidInput("Active coupons need a future expiration date");
  return { code, kind: body.kind, value, minimumSpend, maxDiscount, expiresAt, active: body.active !== false };
};

exports.listAvailable = async (req, res) => {
  try {
    const coupons = await Coupon.find({ active: true, expiresAt: { $gt: new Date() } })
      .sort({ minimumSpend: 1, code: 1 }).lean();
    return res.json({ coupons });
  } catch (error) {
    console.error("Error listing coupons:", error);
    return res.status(500).json({ message: "Could not load coupons" });
  }
};

exports.preview = async (req, res) => {
  try {
    const code = normalizeCode(req.body.code);
    if (!code) return res.status(400).json({ message: "Enter a coupon code" });
    const cart = await Cart.findOne({ user: req.user._id }).populate("products.product");
    const items = cart?.products.filter((item) => item.product) || [];
    if (!items.length) return res.status(400).json({ message: "Add an item to your bag first" });
    const subtotal = getCartSubtotal(items);
    const coupon = await Coupon.findOne({ code });
    const result = evaluateCoupon(coupon, subtotal);
    if (result.error) return res.status(400).json({ message: result.error });
    return res.json({ code, subtotal, ...result });
  } catch (error) {
    console.error("Error previewing coupon:", error);
    return res.status(500).json({ message: "Could not check coupon" });
  }
};

exports.listAdmin = async (req, res) => {
  try {
    return res.json({ coupons: await Coupon.find().sort({ createdAt: -1 }).lean() });
  } catch (error) {
    console.error("Error listing admin coupons:", error);
    return res.status(500).json({ message: "Could not load coupons" });
  }
};

exports.create = async (req, res) => {
  try {
    return res.status(201).json({ coupon: await Coupon.create(couponInput(req.body)) });
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ message: "Coupon code already exists" });
    if (error.name === "CouponInputError" || error.name === "ValidationError") return res.status(400).json({ message: error.message });
    console.error("Error creating coupon:", error);
    return res.status(500).json({ message: "Could not create coupon" });
  }
};

exports.update = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    if (!coupon) return res.status(404).json({ message: "Coupon not found" });
    coupon.set(couponInput(req.body));
    await coupon.save();
    return res.json({ coupon });
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ message: "Coupon code already exists" });
    if (error.name === "CastError") return res.status(400).json({ message: "Invalid coupon ID" });
    if (error.name === "CouponInputError" || error.name === "ValidationError") return res.status(400).json({ message: error.message });
    console.error("Error updating coupon:", error);
    return res.status(500).json({ message: "Could not update coupon" });
  }
};

exports.remove = async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndDelete(req.params.id);
    if (!coupon) return res.status(404).json({ message: "Coupon not found" });
    return res.json({ message: "Coupon deleted" });
  } catch (error) {
    if (error.name === "CastError") return res.status(400).json({ message: "Invalid coupon ID" });
    console.error("Error deleting coupon:", error);
    return res.status(500).json({ message: "Could not delete coupon" });
  }
};
