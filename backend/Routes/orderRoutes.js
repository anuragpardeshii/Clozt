const express = require('express');
const router = express.Router();
const orderController = require('../Controller/orderController');
const isLoggedIn = require('../Middleware/isLoggedIn');
const isAdminLoggedIn = require('../Middleware/isAdminLoggedIn');

// Create a new order
router.post("/create", isLoggedIn, orderController.createOrder);

// Get all orders for a user
router.get('/admin', isAdminLoggedIn, orderController.getAdminOrders);
router.patch('/admin/:id/status', isAdminLoggedIn, orderController.updateAdminStatus);
router.get('/', isLoggedIn, orderController.getUserOrders);

module.exports = router;
