const express = require('express');
const router = express.Router();
const paymentController = require('../Controller/paymentController');
// const { protect } = require('../Middleware/authMiddleware');

// Create a Razorpay order
router.post('/create-order', paymentController.createOrder);

// Verify Razorpay payment
router.post('/verify', paymentController.verifyPayment);

module.exports = router;