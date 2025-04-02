import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export const placeOrder = async (orderData, token) => {
  try {
    if (!token) throw new Error("Authorization token is required");

    const response = await axios.post(`${API_BASE_URL}/orders`, orderData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to place order");
  }
};
