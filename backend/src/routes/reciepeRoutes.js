const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

// Route to get recipe recommendations based on cart items
router.get('/recommendations/:userId', recipeController.getRecipeRecommendations);

module.exports = router;