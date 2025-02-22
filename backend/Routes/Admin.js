const express = require("express");
const { login, register, checkAuth, logout } = require("../Controller/adminController");

const router = express.Router();

// Public routes
router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.get("/check", checkAuth);

module.exports = router;