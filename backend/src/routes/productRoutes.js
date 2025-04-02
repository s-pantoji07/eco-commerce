const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Category = require("../models/Category");

router.get("/", async (req, res) => {
  try {
    const { category, search, page = 1, limit = 10 } = req.query; // Get query params
    const skip = (page - 1) * limit;

    let query = {};

    // If category is provided, find the category by name and use its _id
    if (category) {
      const categoryDoc = await Category.findOne({ name: category }); // Find the category by name
      if (!categoryDoc) {
        return res.status(404).json({ message: "Category not found" });
      }
      query.category = categoryDoc._id; // Use the category's ObjectId
    }

    // If search term is provided, perform a case-insensitive search for product name
    if (search) query.name = { $regex: search, $options: "i" }; // i for case-insensitive

    // Fetch products with pagination
    const products = await Product.find(query)
      .skip(skip)
      .limit(parseInt(limit));

    console.log(`Fetched products for page ${page}:`, products.length); // Debugging log
    
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
