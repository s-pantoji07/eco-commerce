import axios from "axios";

// const API_URL = "http://localhost:5000/api/auth";
const API_URL = `${import.meta.env.VITE_API_URL}/api/auth`|| "http://localhost:5000/api/auth";


// Register User
export const registerUser = async (userData) => {
  return await axios.post(`${API_URL}/register`, userData);
};

// Login User
export const loginUser = async (userData) => {
  return await axios.post(`${API_URL}/login`, userData);
};
