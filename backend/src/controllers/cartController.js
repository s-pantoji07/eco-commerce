const Cart = require("../models/Cart");
const Product = require("../models/Product");
const mongoose = require("mongoose");
// Add or update item in cart
exports.addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    // Validate input quantity
    if (quantity <= 0) {
      return res.status(400).json({ success: false, message: "Quantity must be at least 1" });
    }

    // Check if the product exists
    const product = await Product.findById(new mongoose.Types.ObjectId(productId));
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ productId, quantity, price: product.price_after_discount }],
      });
    } else {
      const existingItem = cart.items.find((item) => item.productId.equals(productId));

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ productId, quantity, price: product.price_after_discount });
      }
    }

    // Recalculate total price
    cart.totalPrice = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    await cart.save();
    res.status(200).json({ success: true, message: "Item added to cart", cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get user's cart
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate({
      path: "items.productId",
      select: "name image price_after_discount",
    });

    if (!cart || cart.items.length === 0) {
      return res.status(404).json({ success: false, message: "Cart is empty" });
    }

    res.status(200).json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Remove an item from cart
exports.removeFromCart = async (req, res) => {
  const { userId, itemId } = req.params; // Use itemId

  try {
      let cart = await Cart.findOne({ userId });
      if (!cart) {
          return res.status(404).json({ success: false, message: "Cart not found" });
      }

      // Ensure correct filtering with itemId instead of productId
      cart.items = cart.items.filter((item) => item._id.toString() !== itemId.toString());

      // Recalculate total price
      cart.totalPrice = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

      if (cart.items.length === 0) {
          await Cart.deleteOne({ _id: cart._id });
          return res.status(200).json({ success: true, message: "Cart is now empty" });
      }

      // Ensure save happens
      await cart.save();

      res.status(200).json({ success: true, message: "Item removed from cart", cart });
  } catch (error) {
      console.error("Error in removeFromCart:", error);
      res.status(500).json({ success: false, message: error.message });
  }
};




// Update item quantity in cart
exports.updateCartItem = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    if (quantity <= 0) {
      return res.status(400).json({ success: false, message: "Quantity must be at least 1" });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    const item = cart.items.find((item) => item.productId.equals(productId));

    if (!item) {
      return res.status(404).json({ success: false, message: "Item not found in cart" });
    }

    item.quantity = quantity;

    // Recalculate total price
    cart.totalPrice = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    await cart.save();
    res.status(200).json({ success: true, message: "Cart updated", cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
