require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

// Route imports
const productRoutes = require("./Routes/product");
const cartRoutes = require("./Routes/Cart");
const wishlistRoutes = require("./Routes/Wishlist");
const userRoutes = require("./Routes/User");
const adminRoutes = require("./Routes/Admin");
const orderRoutes = require("./Routes/orderRoutes");

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(morgan("dev"));
app.use(cors({
  origin: "http://localhost:5173", // Update for production accordingly
  credentials: true,
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Test route
app.get("/", (req, res) => {
  res.send("Backend is working");
});

// MongoDB connection
mongoose.connect(MONGO_URI)
.then(() => console.log("MongoDB Connected Successfully"))
.catch((err) => console.error("MongoDB Connection Error:", err.message));

// API Routes
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});