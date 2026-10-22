const mongoose = require("mongoose");
const Product = require("../Models/Product");
const Review = require("../Models/Review");

const getReviews = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }
    const reviews = await Review.find({ product: req.params.id })
      .populate("user", "username")
      .sort({ createdAt: -1 })
      .lean();
    const average = reviews.length
      ? reviews.reduce((total, review) => total + review.rating, 0) / reviews.length
      : 0;
    return res.json({ reviews, average, count: reviews.length });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return res.status(500).json({ message: "Could not fetch reviews" });
  }
};

const saveReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }
    if (!Number.isInteger(rating) || rating < 1 || rating > 5 || typeof comment !== "string" || comment.trim().length < 10 || comment.trim().length > 1000) {
      return res.status(400).json({ message: "Choose 1–5 stars and write a review of 10–1000 characters" });
    }
    if (!await Product.exists({ _id: req.params.id })) {
      return res.status(404).json({ message: "Product not found" });
    }
    const review = await Review.findOneAndUpdate(
      { product: req.params.id, user: req.user._id },
      { $set: { rating, comment: comment.trim() } },
      { upsert: true, new: true, runValidators: true }
    ).populate("user", "username");
    return res.json({ review });
  } catch (error) {
    console.error("Error saving review:", error);
    return res.status(500).json({ message: "Could not save review" });
  }
};

module.exports = { getReviews, saveReview };
