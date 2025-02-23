const express = require("express");
const { login, register, checkAuth, logout } = require("../Controller/adminController");

const router = express.Router();

// Public routes
router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.get("/check", checkAuth);

// Protected routes (Only accessible if authenticated)
// router.use(adminAuthMiddleware); // Middleware will protect all routes below this line

// router.get("/dashboard", (req, res) => {
//   res.json({ message: "Welcome to the Admin Dashboard", adminId: req.adminId });
// });

module.exports = router;