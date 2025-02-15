require("dotenv").config();
const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const morgan = require("morgan");
const userModel = require("./Models/User");
const adminModel = require("./Models/Admin");
const multer = require("multer");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const productRoutes = require("./Routes/product");
// const getProducts = require("./Routes/product");
const PORT = process.env.PORT || 3000;
const cookieParser = require("cookie-parser");
const MONGO_URI ="mongodb+srv://pardeshianurag22:qwertyuiop@clozt.bxmri.mongodb.net/?retryWrites=true&w=majority&appName=Clozt";
const authRoutes = require("./routes/auth"); // Example auth routes
const wishlistRoutes = require("./Routes/Wishlist"); // Import wishlist route

app.use(cookieParser());

app.use(bodyParser.json()); // Parse JSON requests
app.use(morgan("dev"));

// Middleware to parse incoming JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173", // Vite dev server
    credentials: true, // Allow cookies to be sent
  })
);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB database connection established successfully");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB connection is open");
});

app.get("/", (req, res) => {
  res.send("Hello, App is working");
});
app.use("/api/products", productRoutes);

// Create user signin
app.post("/create", async (req, res) => {
  try {
    let { username, email, password, mobile } = req.body;

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        // Validate input
        if (!username || !email || !password || !mobile) {
          return res.status(400).json({ message: "All fields are required." });
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
          return res
            .status(400)
            .json({ message: "User with this email already exists." });
        }

        // Create user
        let createdUser = await userModel.create({
          username,
          email,
          password: hash,
          mobile,
        });

        let token = jwt.sign({ email }, "secretkey");
        res.cookie("token", token);
        res.status(201).json({
          message: "User created successfully.",
          user: { username: createdUser.username, email: createdUser.email },
        });
      });
    });
  } catch (err) {
    console.error("Error creating user:", err);

    // Handle unique email constraint error
    if (err.code === 11000) {
      return res.status(400).json({ message: "Email already in use." });
    }

    res.status(500).json({ message: "Internal server error." });
  }
});


//user 
app.get("/user", async (req, res) => {
  try {
    const user = await userModel.find(); // Adjust based on your database
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Create admin
app.post("/admin", async (req, res) => {
  try {
    let { username, email, password, mobile } = req.body;

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        // Validate input
        if (!username || !email || !password || !mobile) {
          return res.status(400).json({ message: "All fields are required." });
        }

        // Check if user already exists
        const existingAdmin = await adminModel.findOne({ email });
        if (existingAdmin) {
          return res
            .status(400)
            .json({ message: "Admin with this email already exists." });
        }

        // Create Admin
        let createdAdmin = await adminModel.create({
          username,
          email,
          password: hash,
          mobile,
        });

        let token = jwt.sign({ email }, "secretkey");
        res.cookie("token", token);
        res.status(201).json({
          message: "Admin created successfully.",
          admin: { username: createdAdmin.username, email: createdAdmin.email },
        });
      });
    });
  } catch (err) {
    console.error("Error creating user:", err);

    // Handle unique email constraint error
    if (err.code === 11000) {
      return res.status(400).json({ message: "Email already in use." });
    }

    res.status(500).json({ message: "Internal server error." });
  }
});

// new file
app.use("/api/products", productRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/wishlist", wishlistRoutes); 

//login
app.post("/login-user", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User does not exist" });

    // Check if user has a password before comparing
    if (!user.password)
      return res.status(500).json({ message: "Password not set" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Wrong Password" });

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, "secretkey", { expiresIn: "1d" });

    // Set cookie with security settings
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // True in production
      sameSite: "Lax",
      path: "/", // Apply cookie to the entire site
      maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
    });

    // Remove password from user object before sending response
    const { password: _, ...userData } = user.toObject();

    res.json({ message: "Login successful", user: userData });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
});

app.get("/auth-status", (req, res) => {
  const token = req.cookies.token; // Now `req.cookies` will be defined

  if (!token) {
    return res.json({ loggedIn: false });
  }

  try {
    jwt.verify(token, "secretkey"); // Use the correct secret key
    res.json({ loggedIn: true });
  } catch (err) {
    res.json({ loggedIn: false });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
