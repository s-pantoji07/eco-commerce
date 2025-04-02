import React, { useState, useEffect } from "react";
import "../Styles/Cart.css";
const CartItemCard = ({ item, onDelete, onUpdate }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    setIsUpdated(quantity !== item.quantity);
  }, [quantity, item.quantity]);

  return (
    <div className="cart-item-card">
      <img src={item.productId.image} alt={item.productId.name} className="item-image" />
      <div className="item-details">
        <h3>{item.productId.name}</h3>
        <p>Final Cost: ₹{item.productId.price_after_discount * quantity}</p>
        <div className="quantity-container">
          <label>Quantity:  </label>
          <input
            type="number"
            value={quantity}
            min="1"
            onChange={(e) => setQuantity(parseInt(e.target.value, 10) || 1)}
          />
        </div>
        <div className="button-container">
        <button className="delete-btn" onClick={() => onDelete(item._id)}>Delete</button>




          <button className="update-btn" onClick={() => onUpdate(item.productId._id, quantity)} disabled={!isUpdated}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
