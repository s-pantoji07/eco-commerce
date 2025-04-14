import React, { useEffect, useState } from "react";
import { getUserOrders } from "../api/orderApi";
import "../Styles/myorder.css";
import ScrollToTopButton from "../components/ScrollToTopButton";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getUserOrders();
        // Sort orders by creation date (newest first)
        const sortedOrders = [...data].sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setOrders(sortedOrders);
      } catch (err) {
        setError(err.message || "Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Keeping your original logic for delivery statuses
  const getOrderProgress = (createdAt) => {
    const now = Date.now();
    const orderTime = new Date(createdAt).getTime();
    const elapsed = now - orderTime;
  
    if (elapsed < 1000 * 60 * 15) return { status: 1, text: "Order Processed" }; // 15 minutes
    if (elapsed < 1000 * 60 * 30) return { status: 2, text: "Order Designing" }; // 30 minutes
    if (elapsed < 1000 * 60 * 60) return { status: 3, text: "Order Shipped" };   // 1 hour
    if (elapsed < 1000 * 60 * 60 * 2) return { status: 4, text: "Order En Route" }; // 2 hours
    return { status: 5, text: "Order Arrived" };
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) return <div className="loading-container"><p>Loading orders...</p></div>;
  if (error) return <div className="error-container"><p>{error}</p></div>;

  return (
    <div className="orders-container">
      {orders.length === 0 ? (
        <div className="no-orders">
          <p>No orders found.</p>
        </div>
      ) : (
        orders.map((order) => {
          const progress = getOrderProgress(order.createdAt);
          const steps = [
            "Order Processed",
            // "Order Designing",
            "Order Shipped",
            "Order En Route",
            "Order Arrived"
          ];
          
          return (
            <div key={order._id} className="order-card">
              {/* Order Header */}
              <div className="order-header">
                <div className="order-id-date">
                  <h2>Order #{order._id.substring(order._id.length - 8)}</h2>
                  <p>Placed {formatDate(order.createdAt)} | ₹{order.totalAmount.toFixed(2)}</p>
                </div>
                <button className="print-details-btn">
                  <span className="print-icon">🖨️</span> Print Details
                </button>
              </div>

              {/* Status Updates Section */}
              <div className="status-updates-section">
                <div className="info-icon">ℹ️</div>
                <div className="status-text">
                  <p>Sign up for text messages, and we'll send you order updates every step of the way.</p>
                  <button className="signup-btn">Sign Up</button>
                </div>
                <button className="close-btn">×</button>
              </div>

              {/* Shipping Status */}
              <div className="order-status-section">
                <div className="status-col">
                  <h3 className="status-label">{progress.text}</h3>
                  <p className="carrier">Via {order.carrier || "Local Delivery"}</p>
                  <p className="arrival-estimate">
                    <span className="status-dot"></span> Estimated Arrival Tomorrow
                  </p>
                  
                  {/* Progress Bar */}
                  <div className="order-progress">
                    {steps.map((step, index) => (
                      <div 
                        key={index}
                        className={`progress-step ${index < progress.status ? "completed" : ""}`}
                      >
                        <div className="step-dot"></div>
                        <div className="step-label">{step}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="delivery-col">
                  <h3 className="delivery-label">Deliver To</h3>
                  <p className="recipient-name">{order.recipientName || "John Newman"}</p>
                  <p className="delivery-address">{order.address}</p>
                  <p className="phone-number">{order.phoneNumber || "(615) 315-9111"}</p>
                  <button className="track-btn">Track Package</button>
                </div>
              </div>

              {/* Order Items */}
              <div className="order-items-section">
                {order.items && order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <div className="item-image">
                      <img src={item.image || "/api/placeholder/60/60"} alt={item.name} />
                    </div>
                    <div className="item-details">
                      <h4 className="item-name">{item.name}</h4>
                      <p className="item-id">Item #{item.itemId || "81T032"} Model #{item.modelId || "64267101"}</p>
                      <p className="item-price">${item.price.toFixed(2)} each QTY: {item.quantity}</p>
                      <p className="return-by">Return by {formatDate(new Date(new Date().setDate(new Date().getDate() + 30)))}</p>
                      <button className="review-btn">Write a Review</button>
                      <div className="rating-stars">
                        ☆☆☆☆☆
                      </div>
                    </div>
                    <div className="item-actions">
                      <button className="buy-again-btn">Buy it Again</button>
                      <button className="start-return-btn">Start a Return</button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Payment Method */}
              <div className="payment-section">
                <h3 className="payment-label">Payment Method</h3>
                <div className="payment-method">
                  <div className="card-icon">{order.paymentMode === "VISA" ? "VISA" : "💳"}</div>
                  <div className="card-details">
                    <p className="card-number">**** **** **** {order.lastFourDigits || "6335"}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
      <ScrollToTopButton />
    </div>
  );
};

export default MyOrders;