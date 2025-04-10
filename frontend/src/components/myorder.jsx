import React, { useEffect, useState } from "react";
import { getUserOrders } from "../api/orderApi";
import "../Styles/myorder.CSS"; // Assuming you have a CSS file for styling

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getUserOrders();
        setOrders(data);
      } catch (err) {
        setError(err.message || "Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Updated delivery statuses with more granular steps
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

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="orders">
      <h2 style={{ textAlign: 'center', fontWeight: 'bold' }}>Your Orders</h2>
      {orders.length === 0 ? (
        <p style={{ textAlign: 'center', fontWeight: 'bold' }}>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order) => {
            const progress = getOrderProgress(order.createdAt);
            const steps = [
              "Order Processed",
              "Order in Packing ",
              "Order Shipped",
              "Order En Route",
              "Order Arrived",
            ];

            return (
              <li key={order._id} className="order-item">
                <p>
                  <strong>Order ID:</strong> {order._id}
                </p>
                <p>
                  <strong>Address:</strong> {order.address}
                </p>
                <p>
                  <strong>Payment Mode:</strong> {order.paymentMode}
                </p>
                <p>
                  <strong>Total Amount:</strong> ₹{order.totalAmount}
                </p>
                <p>
                  <strong>Delivery Charge:</strong> ₹{order.deliveryCharge}
                </p>

                {/* Progress Bar */}
                <div className="progress-bar">
                  <div className="progress-steps">
                    {steps.map((step, index) => (
                      <div
                        key={index}
                        className={`step ${index < progress.status ? "completed" : ""}`}
                      >
                        <div className="step-circle"></div>
                        <span className="step-label">{step}</span>
                      </div>
                    ))}
                  </div>
                  <div
                    className="progress-line"
                    style={{
                      width: `${((progress.status - 1) / (steps.length - 1)) * 100}%`,
                    }}
                  ></div>
                </div>

                <p>
                  <strong>Status:</strong> {progress.text}
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default MyOrders;