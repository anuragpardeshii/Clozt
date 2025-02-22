const Admin = require("../Models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

/**
 * @desc Admin Login
 * @route POST /api/admin/login
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" }); // Prevents guessing email exists
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: admin._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({ message: "Login successful", token });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * @desc Check if Admin is Logged In
 * @route GET /api/admin/check
 */
exports.checkAuth = (req, res) => {
  const token = req.cookies.adminToken;

  if (!token) {
    return res.json({ loggedIn: false });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.json({ loggedIn: false });
    }

    res.json({ loggedIn: true, userId: decoded.userId });
  });
};

/**
 * @desc Admin Registration
 * @route POST /api/admin/register
 */
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin
    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
    });

    await newAdmin.save();
    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * @desc Admin Logout
 * @route POST /api/admin/logout
 */
exports.logout = async (req, res) => {
  try {
    res.cookie("adminToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      expires: new Date(0), // Expire immediately
    });

    return res.json({ message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Logout failed", error: error.message });
  }
};