const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../models/Product"); // Import Product model
const Category = require("../models/Category"); // Import Category model

// GET Products by Category
router.get("/", async (req, res) => {
  try {
    const categoryName = req.query.category; // Get category name from query params

    if (!categoryName) {
      return res.status(400).json({ message: "Category is required" });
    }

    // Find the category by name to get its _id
    const category = await Category.findOne({ name: categoryName });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    console.log("Category Found:", category); // Debugging

    // Fetch products using the category's ObjectId
    const products = await Product.find({ category: category._id }).populate("category");

    if (products.length === 0) {
      console.log("No products found for category:", category._id);
    } else {
      console.log("Products found:", products.length);
    }

    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
