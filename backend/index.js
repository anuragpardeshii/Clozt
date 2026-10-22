require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { uploadDir } = require("./config/cloudinary");
const bodyParser = require("body-parser");
const getMongoUri = require("./config/mongoUri");
const { randomUUID, timingSafeEqual } = require("crypto");

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
const defaultOrigins = ["https://clozt.vercel.app"];
if (process.env.NODE_ENV !== "production") {
  defaultOrigins.push("http://localhost:5173", "http://localhost:5174");
}
const normalizeOrigin = (value) => {
  try {
    const url = new URL(value.trim());
    return ["http:", "https:"].includes(url.protocol) ? url.origin : null;
  } catch {
    return null;
  }
};
const allowedOrigins = [...new Set([
  ...defaultOrigins,
  ...(process.env.FRONTEND_ORIGIN || "").split(",").map(normalizeOrigin).filter(Boolean),
])];
const requestPath = (req) => req.originalUrl.split("?")[0];
console.info("Allowed frontend origins:", allowedOrigins.join(", "));
app.use((req, res, next) => {
  req.requestId = randomUUID();
  res.set("X-Request-Id", req.requestId);
  next();
});
morgan.token("request-id", (req) => req.requestId);
morgan.token("path", requestPath);
app.use(morgan(":method :path :status :response-time ms requestId=:request-id"));
app.use((req, res, next) => {
  const origin = req.get("Origin");
  if (["POST", "PUT", "PATCH", "DELETE", "OPTIONS"].includes(req.method) && origin && !allowedOrigins.includes(origin)) {
    console.warn("API origin rejected:", { requestId: req.requestId, method: req.method, path: requestPath(req), origin });
    return res.status(403).json({ message: "Origin not allowed", requestId: req.requestId });
  }
  next();
});
app.use(cors({ origin: allowedOrigins, credentials: true }));
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
.catch((error) => {
  console.error("MongoDB connection error:", { name: error.name, code: error.code });
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
app.use("/api", (req, res) => {
  res.status(404).json({ message: "API route not found", requestId: req.requestId });
});
app.use((error, req, res, next) => {
  if (res.headersSent) return next(error);
  console.error("Unhandled API error:", {
    requestId: req.requestId,
    method: req.method,
    path: requestPath(req),
    name: error.name,
    code: error.code,
    type: error.type,
  });
  const status = Number.isInteger(error.status) && error.status >= 400 && error.status < 500 ? error.status : 500;
  res.status(status).json({ message: status === 500 ? "Server error" : "Invalid request", requestId: req.requestId });
});

module.exports = app;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}
