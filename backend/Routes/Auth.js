const express = require("express");
const { login, checkAuth } = require("../Controller/authController");
const router = express.Router();

router.post("/login", login);
router.get("/auth/check", checkAuth);

module.exports = router;