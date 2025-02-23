const jwt = require("jsonwebtoken");
const Admin = require("../Models/Admin");

const isAdminLoggedIn = async (req, res, next) => {
  const token = req.cookies.adminToken;

  if (!token) {
    return res.status(401).json({ message: "Access denied. Please log in." });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token." });
    }

    try {
      const admin = await Admin.findById(decoded.userId);

      if (!admin) {
        return res.status(403).json({ message: "Access denied. Admin not found." });
      }

      req.adminId = admin._id; // Attach admin ID to request
      next();
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });
};

module.exports = isAdminLoggedIn;