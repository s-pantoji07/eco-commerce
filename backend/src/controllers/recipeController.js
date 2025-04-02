const { generateRecipeRecommendations } = require('../utils/ollama');
const Cart = require("../models/Cart");
const Product = require("../models/Product");

exports.getRecipeRecommendations = async (req, res) => {
  const { userId } = req.params;

  try {
    // Fetch the user's cart items with product details
    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "name image price_after_discount"
    });

    if (!cart || cart.items.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: "Cart is empty. Add ingredients to get recipe recommendations." 
      });
    }

    // Format cart items for recipe generation
    const ingredients = cart.items.map(item => ({
      name: item.productId.name,
      quantity: item.quantity
    }));

    // Get recipe recommendations from Ollama
    const recipeData = await generateRecipeRecommendations(ingredients);

    res.status(200).json({ 
      success: true, 
      recipes: recipeData.response,
      ingredients: ingredients
    });
  } catch (error) {
    console.error("Error generating recipe recommendations:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to generate recipe recommendations",
      error: error.message 
    });
  }
};