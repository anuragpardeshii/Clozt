const jwt = require("jsonwebtoken");

const isAdminLoggedIn = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Access denied. Please log in." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token." });
    }

    req.adminId = decoded.userId; // Attach admin ID to request object
    next();
  });
};

module.exports = isAdminLoggedIn;
