const Admin = require("../Models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: admin._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: "7d" }
    );

    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict", // lowercase is the modern approach
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({ message: "Login successful", token });

  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * @desc Check if Admin is Logged In
 * @route GET /api/admin/check
 */
exports.checkAuth = async (req, res) => {
  try {
    const token = req.cookies.adminToken;

    if (!token) {
      return res.json({ loggedIn: false });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return res.json({ loggedIn: true, userId: decoded.userId });
    } catch (err) {
      res.cookie("adminToken", "", { 
        expires: new Date(0), 
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict"
      });
      return res.json({ loggedIn: false });
    }
  } catch (error) {
    console.error("Auth Check Error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc Admin Registration
 * @route POST /api/admin/register
 */
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin
    const newAdmin = new Admin({
      username,
      email,
      password: hashedPassword,
      role: "admin", // ✅ Ensures admin access in middleware
    });

    await newAdmin.save();
    return res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    console.error("Registration Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * @desc Admin Logout
 * @route POST /api/admin/logout
 */
exports.logout = async (req, res) => {
  try {
    res.clearCookie("adminToken", { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production", 
      sameSite: "strict" 
    });
    return res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout Error:", error);
    return res.status(500).json({ message: "Logout failed", error: error.message });
  }
};