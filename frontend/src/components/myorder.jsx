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

  // Hardcoded delivery statuses based on order creation time
  const getOrderStatus = (createdAt) => {
    const now = Date.now();
    const orderTime = new Date(createdAt).getTime();
    const elapsed = now - orderTime;

    if (elapsed < 1000 * 60 * 60 * 2) return "Order Placed";
    if (elapsed < 1000 * 60 * 60 * 6) return "Processing";
    if (elapsed < 1000 * 60 * 60 * 12) return "Shipped";
    return "Delivered";
  };

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="orders">
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order) => (
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
                <strong>Total Amount:</strong> ${order.totalAmount}
              </p>
              <p>
                <strong>Delivery Charge:</strong> ${order.deliveryCharge}
              </p>
              <p>
                <strong>Status:</strong> {getOrderStatus(order.createdAt)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyOrders;
