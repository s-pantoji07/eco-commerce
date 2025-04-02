import React, { useState, useEffect } from "react";
import { getRecipeRecommendations } from "../api/cartApi";
import "../Styles/recipeRecommendations.css"; // You'll need to create this CSS file

const RecipeRecommendations = ({ userId }) => {
  const [recipes, setRecipes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showRecipes, setShowRecipes] = useState(false);

  const fetchRecipes = async () => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await getRecipeRecommendations(userId);
      if (data.success) {
        setRecipes(data.recipes);
        setShowRecipes(true);
      } else {
        setError(data.message || "Failed to get recommendations");
      }
    } catch (err) {
      setError("An error occurred while fetching recipe recommendations");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="recipe-recommendations">
      <button 
        className="recipe-button" 
        onClick={fetchRecipes} 
        disabled={loading}
      >
        {loading ? "Getting Recipes..." : "Get Recipe Ideas"}
      </button>
      
      {error && <p className="recipe-error">{error}</p>}
      
      {showRecipes && !loading && (
        <div className="recipes-container">
          <h3>Recipe Suggestions</h3>
          <div className="recipe-content">
            {/* Using pre tag to maintain formatting from the AI response */}
            <pre>{recipes}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeRecommendations;