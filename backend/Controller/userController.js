const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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

    // Create a new user
    const newUser = new User({
      username,
      email,
      mobile,
      password: hashedPassword,
    });

    await newUser.save();
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

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.cookie("userToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({ message: "Login successful", token });

  } catch (error) {
    console.error("User Login Error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * @desc Check if User is Logged In
 * @route GET /api/users/check
 */
exports.checkAuth = (req, res) => {
  try {
    const token = req.cookies.userToken;

    if (!token) {
      return res.json({ loggedIn: false });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.cookie("userToken", "", { expires: new Date(0), httpOnly: true });
        return res.json({ loggedIn: false });
      }

      return res.json({ loggedIn: true, userId: decoded.userId });
    });
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
    res.clearCookie("userToken", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "Strict" });
    return res.json({ message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Logout failed", error: error.message });
  }
};