require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { uploadDir } = require("./config/cloudinary");
const bodyParser = require("body-parser");
const getMongoUri = require("./config/mongoUri");
const { timingSafeEqual } = require("crypto");

// Route imports
const productRoutes = require("./Routes/product");
const cartRoutes = require("./Routes/Cart");
const wishlistRoutes = require("./Routes/Wishlist");
const userRoutes = require("./Routes/User");
const orderRoutes = require("./Routes/orderRoutes");
const couponRoutes = require("./Routes/couponRoutes");
const analyticsRoutes = require("./Routes/analyticsRoutes");

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = getMongoUri();

// Middleware
app.use(morgan("dev"));
const allowedOrigins = (process.env.FRONTEND_ORIGIN || "http://localhost:5173,http://localhost:5174")
  .split(",")
  .map((origin) => origin.trim());
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use((req, res, next) => {
  if (["POST", "PUT", "PATCH", "DELETE"].includes(req.method) && req.get("Origin") && !allowedOrigins.includes(req.get("Origin"))) {
    return res.status(403).json({ message: "Origin not allowed" });
  }
  next();
});
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/uploads", express.static(uploadDir));

// Test route
app.get("/", (req, res) => {
  res.send("Backend is working");
});

// MongoDB connection
const connectToMongo = () => mongoose.connect(MONGO_URI)
.then(() => {
  console.log("MongoDB Connected Successfully");
  return true;
})
.catch(() => {
  console.error("MongoDB Connection Error");
  return false;
});
let mongoConnection = connectToMongo();

app.get("/api/internal/mongo-keepalive", async (req, res) => {
  res.set("Cache-Control", "no-store");
  const secret = process.env.CRON_SECRET;
  if (!secret || secret.length < 16) return res.status(503).json({ ok: false });
  const authorization = req.get("Authorization") || "";
  const provided = authorization.startsWith("Bearer ") ? authorization.slice(7) : "";
  const expectedBuffer = Buffer.from(secret);
  const providedBuffer = Buffer.from(provided);
  if (expectedBuffer.length !== providedBuffer.length || !timingSafeEqual(expectedBuffer, providedBuffer)) {
    return res.status(401).json({ ok: false });
  }
  try {
    if (!await mongoConnection) mongoConnection = connectToMongo();
    if (!await mongoConnection || !mongoose.connection.db) return res.status(503).json({ ok: false });
    await mongoose.connection.db.command({ ping: 1 });
    return res.json({ ok: true });
  } catch {
    return res.status(503).json({ ok: false });
  }
});

// API Routes
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: "Server error" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
