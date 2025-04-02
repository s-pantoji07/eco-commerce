const Order = require("../models/Order");

exports.placeOrder = async (req, res) => {
  try {
    const { address, paymentMode, totalAmount, deliveryCharge } = req.body;
    const userId = req.user._id; // Extract from middleware

    if (!userId || !address || !paymentMode || !totalAmount || deliveryCharge === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newOrder = new Order({ userId, address, paymentMode, totalAmount, deliveryCharge });
    await newOrder.save();

    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await Order.find({ userId: userId });

    if (!orders) {
      return res.status(404).json({ success: false, message: "No orders found" });
    }

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};


exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};