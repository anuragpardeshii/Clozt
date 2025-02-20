const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    color: { type: String, required: true },
    gender: { type: String, required: true },
    category: { type: String, required: true },
    sizes: [{ type: String, required: true }],
    images: [{ type: String, required: true }], // Cloudinary image URLs
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
