require("dotenv").config();
const mongoose = require("mongoose");
const Category = require("./models/Category");
const Product = require("./models/Product");
const { categories } = require("./data/sampledata");
const connectDB = require("./config/db");

// Connect to Database
connectDB();

const seedDatabase = async () => {
  try {
    console.log("Seeding Database...");

    // Insert categories and products without deleting existing data
    for (const cat of categories) {
      // Check if the category already exists by name
      let createdCategory = await Category.findOne({ name: cat.name });

      // If the category doesn't exist, create it
      if (!createdCategory) {
        createdCategory = await Category.create({
          name: cat.name,
          image: cat.image,
        });
      }

      const productIds = [];

      for (const prod of cat.products) {
        // Check if the product already exists by name and category
        let createdProduct = await Product.findOne({
          name: prod.name,
          category: createdCategory._id,
        });

        // If the product doesn't exist, create it
        if (!createdProduct) {
          createdProduct = await Product.create({
            ...prod,
            category: createdCategory._id,
          });
        }

        productIds.push(createdProduct._id);
      }

      // Update the category's products field
      createdCategory.products = productIds;
      await createdCategory.save();
    }

    console.log("Database Seeded Successfully! 🎉");
    process.exit();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

// Run Seeder
seedDatabase();
