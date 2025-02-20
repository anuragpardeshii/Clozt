const jwt = require("jsonwebtoken");
const User = require("../Models/User");

const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.token; // Make sure frontend sends credentials
    if (!token) {
      return res.status(401).json({ loggedIn: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password"); // Exclude password

    if (!user) {
      return res.status(401).json({ loggedIn: false, message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ loggedIn: false, message: "Invalid token" });
  }
};

module.exports = isLoggedIn;