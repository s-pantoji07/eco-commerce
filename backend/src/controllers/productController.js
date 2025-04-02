const Product = require("../models/Product");
const Category = require("../models/Category");

const getProductsByCategory = async (req, res) => {
  try {
    const categoryName = req.query.category;

    // If no category is provided, fetch all products
    if (!categoryName) {
      const allProducts = await Product.find();
      return res.json(allProducts);
    }

    // If a category is provided, find the category by name
    const category = await Category.findOne({ name: categoryName });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Find products that belong to this category
    const products = await Product.find({ category: category._id });

    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getProductsByCategory };
