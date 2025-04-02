const express = require("express");
const { addToCart, getCart, removeFromCart, updateCartItem } = require("../controllers/cartController");

const router = express.Router();

// Add an item to the cart
router.post("/add", addToCart);

// Get the user's cart
router.get("/:userId", getCart);

// Update cart item quantity
router.put("/update", updateCartItem);

// Remove an item from the cart
router.delete("/:userId/:itemId", removeFromCart);

module.exports = router;
