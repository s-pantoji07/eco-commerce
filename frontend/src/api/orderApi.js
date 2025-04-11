import axios from "axios";
const API_URL = `${import.meta.env.VITE_API_URL}/api`|| "http://localhost:5000/api/cart";
export const placeOrder = async (orderData) => {
  try {
    // const response = await axios.post("http://localhost:5000/api/orders", orderData,
    const response = await axios.post(`${API_URL}/orders`, orderData,
       {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to place order" };
  }
};
export const getUserOrders = async () => {
  try {
    // const response = await axios.get("http://localhost:5000/api/orders",
    const response = await axios.get(`${API_URL}/orders`, 
       {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    console.log("Raw response:", response); // Debugging log
    console.log("Response data:", response.data); // Ensure it's valid JSON

    return response.data.orders || [];
  } catch (error) {
    console.error("Error fetching orders:", error.response?.data || error);
    throw error.response?.data || { message: "Failed to fetch orders" };
  }
};