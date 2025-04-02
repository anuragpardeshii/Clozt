const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    color: { type: String, required: true },
    gender: { type: String, required: true },
    category: { type: String, required: true },
    listings: { type: [String], required: true, default: ["N/A"] },
    salePrice: { type: Number, default: null },
    discount: { type: Number, default: null },
    sizes: { type: Map, of: Number, required: true },
    images: [{ type: String, required: true }], // Cloudinary image URLs
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
