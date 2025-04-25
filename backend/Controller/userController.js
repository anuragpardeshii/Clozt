const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

/**
 * @desc User Registration
 * @route POST /api/users/register
 */
exports.register = async (req, res) => {
  try {
    const { username, email, mobile, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user using create method for better atomicity
    await User.create({
      username,
      email,
      mobile,
      password: hashedPassword,
    });

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("User Registration Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * @desc User Login
 * @route POST /api/users/login
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET, 
      {
        expiresIn: "7d",
      }
    );

    // Send cookie with token
    res.cookie("userToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict", // Changed from "Strict" to lowercase "strict"
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Use mongoose's lean() for better performance and exclude password
    const userInfo = await User.findById(user._id).select("-password").lean();

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: userInfo,
    });
  } catch (error) {
    console.error("User Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

/**
 * @desc Check if User is Logged In
 * @route GET /api/users/check
 */
exports.checkAuth = async (req, res) => {
  try {
    const token = req.cookies.userToken;

    if (!token) {
      return res.json({ loggedIn: false });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId).select("-password").lean();

      if (!user) {
        return res.json({ loggedIn: false });
      }

      return res.json({ loggedIn: true, user });
    } catch (jwtError) {
      // Token is invalid or expired
      res.cookie("userToken", "", { 
        expires: new Date(0), 
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict" // Changed from "Strict" to lowercase "strict"
      });
      return res.json({ loggedIn: false });
    }
  } catch (error) {
    console.error("User Auth Check Error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc User Logout
 * @route POST /api/users/logout
 */
exports.logout = async (req, res) => {
  try {
    res.clearCookie("userToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict", // Changed from "Strict" to lowercase "strict"
    });
    return res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("User Logout Error:", error);
    return res
      .status(500)
      .json({ message: "Logout failed", error: error.message });
  }
};
