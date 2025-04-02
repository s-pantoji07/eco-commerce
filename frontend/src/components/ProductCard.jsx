import React, { useState } from "react";
import { FaHeart, FaStar } from "react-icons/fa";
import "../styles/Productcard.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  if (!product) return <p>Loading product...</p>;

  const totalPrice = (product?.price_after_discount || 0) * quantity;

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
  
    if (!token) {
      alert("Please login to add items to the cart.");
      window.location.href = "/auth";
      return;
    }
  
    if (!userId || userId === "undefined") {
      alert("User ID not found. Please log in again.");
      return;
    }
  
    if (!product?._id) {
      alert("Product ID is missing. Please try again later.");
      return;
    }
  
    const payload = {
      userId,
      productId: product._id,
      quantity,
    };
  
    try {
      const response = await fetch("http://127.0.0.1:5000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        toast.success("Item added to cart successfully!");
      } else {
        toast.error(`Failed to add item: ${data.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("An error occurred while adding to the cart.");
    }
  };
  

  return (
    <div className="product-card">
      <div className="image-container">
        <img src={product?.image} alt={product?.name} />
      </div>
      <h3 className="product-name">{product?.name}</h3>

      <div className="ratings">
        {Array.from({ length: 5 }).map((_, index) => (
          <FaStar key={index} className={index < (product?.review || 0) ? "star filled" : "star"} />
        ))}
        <span className="review-count">({product?.review || 0})</span>
      </div>

      <div className="price">
        <span className="original-price">${product?.price_before_discount?.toFixed(2) || "0.00"}</span>
        <span className="discounted-price">${totalPrice.toFixed(2)}</span>
        <span className="discount-tag">{product?.discount ?? 0}% OFF</span>
      </div>

      <div className="cart-actions">
        <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
          {[...Array(10).keys()].map((num) => (
            <option key={num + 1} value={num + 1}>{num + 1}</option>
          ))}
        </select>
        <button className="add-to-cart" onClick={handleAddToCart}>
          Add to Cart
        </button>
        <button className="wishlist">
          <FaHeart />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
