const Order = require('../Models/Order');
const Cart = require('../Models/Cart');

// Create a new order after successful payment
exports.createOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { paymentId } = req.body;
    
    // Get user's cart
    const cart = await Cart.findOne({ user: userId }).populate('products.product').lean();
    
    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }
    
    // Calculate total amount
    const totalAmount = cart.products.reduce(
      (sum, item) => sum + (item.product.price * item.quantity), 
      0
    );
    
    // Create order items from cart products
    const orderItems = cart.products.map(item => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.product.price
    }));
    
    // Create new order
    const newOrder = new Order({
      user: userId,
      items: orderItems,
      totalAmount,
      paymentId,
      status: 'Paid'
    });
    
    await newOrder.save();
    
    // Clear the user's cart - using findOneAndUpdate for atomic operation
    await Cart.findOneAndUpdate(
      { user: userId },
      { $set: { products: [] } },
      { new: true }
    );
    
    res.status(201).json({ 
      success: true, 
      message: 'Order created successfully', 
      order: newOrder 
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
};

// Get all orders for a user
exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.user._id;
    
    const orders = await Order.find({ user: userId })
      .populate({
        path: 'items.product',
        select: 'title price images' // Select only needed fields
      })
      .sort({ createdAt: -1 })
      .lean(); // Use lean() for better performance
    
    res.status(200).json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};