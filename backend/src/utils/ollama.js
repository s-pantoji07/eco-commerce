const axios = require('axios');

async function generateRecipeRecommendations(ingredients, options = {}) {
  try {
    const model = options.model || 'tinyllama';
    
    // Format the ingredients list into a usable string
    const ingredientsList = ingredients.map(item => item.name).join(', ');
    
    // Create a prompt that asks for recipes based on the ingredients
    const prompt = `I have these ingredients: ${ingredientsList}. 
Please suggest 3 different recipes I can make using some or all of these ingredients. 
For each recipe, provide:
1. Recipe name
2. Ingredients (with quantities)
3. Brief cooking instructions
Only include recipes that primarily use the ingredients I have mentioned.`;

    // Call the Ollama API
    const response = await axios.post('http://localhost:11434/api/generate', {
      model: model,
      prompt: prompt,
      stream: false,
      ...options
    });

    return response.data;
  } catch (error) {
    console.error('Error calling Ollama API for recipe recommendations:', error.message);
    throw error;
  }
}

// Export the function for use in other files
module.exports = { generateRecipeRecommendations };