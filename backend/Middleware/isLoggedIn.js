const jwt = require("jsonwebtoken");

function isLoggedIn(req, res, next) {
  const token = req.cookies.token;
  
  if (!token) return res.status(401).json({ message: "Login Again" });

  try {
    const data = jwt.verify(token, "secretkey"); // Use an environment variable for security
    req.user = data;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid Token" });
  }
}

module.exports = isLoggedIn;
