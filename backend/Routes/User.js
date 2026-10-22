const express = require("express");
const { login, checkAuth, register, logout, getAdminUsers } = require("../Controller/userController");
const addressController = require("../Controller/addressController");
const isAdminLoggedIn = require('../Middleware/isAdminLoggedIn');
const isLoggedIn = require("../Middleware/isLoggedIn");
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/auth/check", checkAuth);
router.post("/logout", logout);
router.get('/admin', isAdminLoggedIn, getAdminUsers);
router.get("/addresses", isLoggedIn, addressController.list);
router.post("/addresses", isLoggedIn, addressController.create);
router.put("/addresses/:addressId", isLoggedIn, addressController.update);
router.patch("/addresses/:addressId/default", isLoggedIn, addressController.setDefault);
router.delete("/addresses/:addressId", isLoggedIn, addressController.remove);

module.exports = router;
