const mongoose = require("mongoose");

const CouponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, trim: true, uppercase: true },
  kind: { type: String, required: true, enum: ["percent", "fixed"] },
  value: { type: Number, required: true, min: 0.01 },
  minimumSpend: { type: Number, default: 0, min: 0 },
  maxDiscount: { type: Number, default: null, min: 0.01 },
  expiresAt: { type: Date, required: true },
  active: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model("Coupon", CouponSchema);
