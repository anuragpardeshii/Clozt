const jwt = require("jsonwebtoken");
const User = require("../Models/User");

const isLoggedIn = async (req, res, next) => {
  try {
    // console.log("Received Token:", req.cookies.token); // ✅ Debugging step

    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ loggedIn: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("Decoded Token:", decoded); // ✅ Check decoded data

    const user = await User.findById(decoded.userId).select("-password");
    // console.log("Found User:", user); // ✅ Ensure user exists

    if (!user) {
      return res.status(401).json({ loggedIn: false, message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    // console.log("Token verification failed:", error.message); // ✅ Debugging step
    return res.status(401).json({ loggedIn: false, message: "Invalid token" });
  }
};

module.exports = isLoggedIn;