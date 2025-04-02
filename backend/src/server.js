require("dotenv").config(); // Load environment variables
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/connectDB");

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev")); // Logs HTTP requests

// Database Connection
connectDB();

// Routes
app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/auth", require("./routes/userRoutes"));
app.use("/api/cart", require("./routes/cartRoutes")); // Added cart routes
app.use("/api/orders", require("./routes/orderRoutes")); // Added order routes
// app.use("/api/recipe", require("./routes/recipeRoutes")); // Add recipe routes
app.use("/api/recipes", require("./routes/RecipeRoutes")); // New endpoint for recipes
// Root Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Handle undefined routes
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: err.message || "Server Error" });
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));