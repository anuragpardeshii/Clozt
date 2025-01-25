const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  color: String,
  gender: String,
  category: String,
  listings: [String],
  sizes: {
    XS: Number,
    S: Number,
    M: Number,
    L: Number,
    XL: Number,
    XXL: Number,
  },
  images: [String],
});

module.exports = mongoose.model("Product", productSchema);
