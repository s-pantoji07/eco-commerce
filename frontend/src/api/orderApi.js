import axios from "axios";

export const placeOrder = async (orderData) => {
  try {
    const response = await axios.post("http://localhost:5000/api/orders", orderData, {
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
    const response = await axios.get("http://localhost:5000/api/orders", {
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