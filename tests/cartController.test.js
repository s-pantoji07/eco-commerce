const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../server"); // If using `server.js`
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Category = require("../models/Category"); // Import the Category model
let categoryId; // Declare a variable to hold the category ID

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri(), { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Cart Controller Tests", () => {
  let userId, productId;

  beforeEach(async () => {
    await Cart.deleteMany({});
    await Product.deleteMany({});
    
    // Create a unique mock category for each test
    const category = new Category({
      name: `Test Category ${new mongoose.Types.ObjectId()}`, // Unique name
      image: "test.jpg",
    });
    await category.save();
    categoryId = category._id; // Save the category ID

    // Create a mock product
    const product = new Product({
      price_after_discount: 50,
      category: categoryId, // Use the mock category ID
      review: 5, // Provide a numeric value for review
      discount: 0, // Add this field
      name: "Test Product",
      image: "test.jpg",
      price_before_discount: 50,
    });
    await product.save();
    productId = product._id;

    // Mock user ID
    userId = new mongoose.Types.ObjectId();
  });

  test("Should add item to cart", async () => {
    const response = await request(app)
      .post("/api/cart/add") // Corrected route
      .send({ userId, productId, quantity: 2 });
  
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.cart.items.length).toBe(1);
    expect(response.body.cart.totalPrice).toBe(100);
  });

  test("Should return error for invalid quantity", async () => {
    const response = await request(app)
      .post("/api/cart/add") // Fixed route
      .send({ userId, productId, quantity: 0, category: categoryId });

    expect(response.status).toBe(400); // Expecting 400 Bad Request
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Quantity must be at least 1");
  });

  test("Should get user's cart", async () => {
    await request(app)
      .post("/api/cart/add") // Corrected route
      .send({ userId, productId, quantity: 3 });
  
    const response = await request(app).get(`/api/cart/${userId}`); // Corrected route
  
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.cart.items.length).toBe(1);
  });

  test("Should return 404 for empty cart", async () => {
    const response = await request(app).get(`/api/cart/${userId}`); // Fixed route

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Cart is empty");
  });

  test("Should remove an item from cart", async () => {
    const addResponse = await request(app)
      .post("/api/cart/add") // Corrected route
      .send({ userId, productId, quantity: 1 });
  
    const itemId = addResponse.body.cart.items[0]._id; // Ensure item ID is valid
  
    const removeResponse = await request(app).delete(`/api/cart/${userId}/${itemId}`); // Corrected route
  
    expect(removeResponse.status).toBe(200);
    expect(removeResponse.body.success).toBe(true);
    expect(removeResponse.body.message).toBe("Cart is now empty");
  });
  

  test("Should return 404 when removing from empty cart", async () => {
    const fakeItemId = new mongoose.Types.ObjectId(); // Generate a valid MongoDB ObjectId
  
    const response = await request(app).delete(`/api/cart/${userId}/${fakeItemId}`);
  
    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Cart not found");
  });
  
});