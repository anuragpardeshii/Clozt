const jwt = require("jsonwebtoken");
function isLoggedIn(req, res, next) {
  console.log("Cookies received:", req.cookies); // ✅ Debugging

  const token = req.cookies.token;
  if (!token) {
    console.log("❌ No token received.");
    return res.status(401).json({ message: "Login Again" });
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ User ID from token:", data.id);

    if (!data.id) {
      return res.status(403).json({ message: "Invalid Token Data" });
    }

    req.user = { id: data.id, email: data.email };
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid Token" });
  }
}

module.exports = isLoggedIn;
