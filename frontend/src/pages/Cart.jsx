import React, { useEffect, useState } from "react";
import CartItemCard from "../components/CartItemCard";
import RecipeRecommendations from "../components/recipeRecommendations"; // Import the new component
import "../Styles/Cart.css";
import { removeFromCart } from "../api/cartApi";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      console.warn("No userId found. Redirecting to login.");
      return;
    }

    const fetchCart = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/cart/${userId}`);
        const data = await response.json();

        if (data.success && data.cart) {
          setCartItems(data.cart.items || []);
        } else {
          console.error("Cart data format is incorrect:", data);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [userId]);

  const handleDelete = async (itemId) => {
    const confirmDelete = window.confirm("Are you sure you want to remove this item?");
    if (!confirmDelete) return;

    try {
      const data = await removeFromCart(userId, itemId);
      if (data.success) {
        setCartItems(cartItems.filter((item) => item._id !== itemId));
        alert("Item removed from cart.");
      } else {
        alert("Failed to remove item.");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("An error occurred.");
    }
  };

  const handleUpdate = async (itemId, newQuantity) => {
    try {
      const response = await fetch(`http://localhost:5000/api/cart/update/${userId}/${itemId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: newQuantity }),
      });
      const data = await response.json();
      if (data.success) {
        setCartItems(
          cartItems.map((item) =>
            item._id === itemId ? { ...item, quantity: newQuantity } : item
          )
        );
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  // Calculate total cart value
  const totalCartValue = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalAmount = totalCartValue;

  if (loading) return <p>Loading cart...</p>;
  if (cartItems.length === 0) return <div className="empty-cart">Your cart is empty.</div>;

  return (
    <div className="cart-container">
      {/* Left Section: Cart Items */}
      <div className="cart-items-section">
        {cartItems.map((item) => (
          <div className="cart-item-row" key={item._id}>
            <img src={item.image} alt={item.name} className="cart-item-thumbnail" />
            <CartItemCard item={item} onDelete={handleDelete} onUpdate={handleUpdate} />
          </div>
        ))}
        
        {/* Recipe Recommendations Section */}
        <div className="recipe-section">
          <h3>What can I cook with these ingredients?</h3>
          <RecipeRecommendations userId={userId} />
        </div>
      </div>

      {/* Right Section: Checkout */}
      <div className="checkout-section">
        <h2>Checkout</h2>
        <div className="cart-summary">
          <p>Subtotal: ₹{totalCartValue.toFixed(2)}</p>

          <h3>Total: ₹{totalCartValue.toFixed(2)}</h3>
        </div>

        <button className="checkout-btn" onClick={() => navigate("/payment", { state: { cartTotal: totalAmount } })}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
