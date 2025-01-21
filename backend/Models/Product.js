const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  color: { type: String, required: true },
  gender: { type: String, enum: ["Male", "Female"], required: true },
  category: { type: String, required: true },
  listings: { type: [String], required: false }, // e.g., ["New Arrivals", "Sale"]
  quantity: {
    xs: { type: Number, default: 0 },
    s: { type: Number, default: 0 },
    m: { type: Number, default: 0 },
    l: { type: Number, default: 0 },
    xl: { type: Number, default: 0 },
    xxl: { type: Number, default: 0 },
  },
  images: [{ type: String }], // Store image URLs (or local file paths)
});

module.exports = mongoose.model("Product", productSchema);