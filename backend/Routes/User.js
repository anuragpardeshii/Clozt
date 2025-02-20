const express = require("express");
const { login, checkAuth, register, logout } = require("../Controller/authController"); // Check path
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/auth/check", checkAuth);
router.post("/logout", logout);

module.exports = router;
