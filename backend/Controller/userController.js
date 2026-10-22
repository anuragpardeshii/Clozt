const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authCookie = require("../config/authCookie");
const TrafficEvent = require('../Models/TrafficEvent');
const pagination = require('../services/pagination');

/**
 * @desc User Registration
 * @route POST /api/users/register
 */
exports.register = async (req, res) => {
  try {
    const { username, email, mobile, password } = req.body;
    if ([username, email, mobile, password].some((field) => typeof field !== "string" || !field.trim())) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the user already exists
    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail }).collation({ locale: "en", strength: 2 });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user using create method for better atomicity
    await User.create({
      username,
      email: normalizedEmail,
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
    if (typeof email !== "string" || typeof password !== "string" || !email.trim() || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }

    // Find user by email
    const user = await User.findOne({ email: email.trim().toLowerCase() }).collation({ locale: "en", strength: 2 });
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

    const signedInAt = new Date();
    await User.updateOne({ _id: user._id }, { $set: { lastLoginAt: signedInAt, lastActiveAt: signedInAt } });
    if (user.role === 'customer') TrafficEvent.create({ kind: 'sign_in', user: user._id, createdAt: signedInAt }).catch((error) => console.error('Sign-in analytics error:', error));

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
      ...authCookie,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Use mongoose's lean() for better performance and exclude password
    const userInfo = await User.findById(user._id).select("-password").lean();

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: userInfo,
    });
  } catch (error) {
    console.error("User Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.getAdminUsers = async (req, res) => {
  try {
    const { page, limit, skip } = pagination(req.query);
    const search = typeof req.query.search === 'string' ? req.query.search.trim().slice(0, 80) : '';
    const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const filter = { role: 'customer', ...(search && { $or: ['username', 'email'].map((field) => ({ [field]: { $regex: escaped, $options: 'i' } })) }) };
    const [users, total] = await Promise.all([
      User.find(filter).select('username email createdAt lastLoginAt lastActiveAt').sort({ createdAt: -1, _id: -1 }).skip(skip).limit(limit).lean(),
      User.countDocuments(filter),
    ]);
    return res.json({ users, total, page, limit, pages: Math.max(1, Math.ceil(total / limit)) });
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ message: 'Could not fetch users' });
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
      res.clearCookie("userToken", authCookie);
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
    res.clearCookie("userToken", authCookie);
    return res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("User Logout Error:", error);
    return res
      .status(500)
      .json({ message: "Logout failed" });
  }
};
