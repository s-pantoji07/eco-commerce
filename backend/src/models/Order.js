const mongoose = require("mongoose"); // Import mongoose

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" }, // Reference to user
  address: { type: String, required: true },
  paymentMode: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  deliveryCharge: { type: Number, required: true }, // Ensure it is a Number
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order; // Export the model
