const express = require('express');
const router = express.Router();
const orderController = require('../Controller/orderController');
// const { protect } = require('../Middleware/isLoggedIn');

// Create a new order
router.post("/create", orderController.createOrder);

// Get all orders for a user
router.get('/', orderController.getUserOrders);

module.exports = router;