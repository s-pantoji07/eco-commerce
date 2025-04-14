const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server"); // If using `server.js`
 // Your Express app
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { generateRecipeRecommendations } = require("../utils/ollama");

// Mock the Ollama function
jest.mock("../utils/ollama");

describe("GET /recipe-recommendations/:userId", () => {
  let userId;
  let product1, product2;

  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/testdb", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Cart.deleteMany();
    await Product.deleteMany();

    userId = new mongoose.Types.ObjectId();
    product1 = new Product({ name: "Tomato", price_after_discount: 5 });
    product2 = new Product({ name: "Onion", price_after_discount: 7 });

    await product1.save();
    await product2.save();
  });

  test("Should return recipe recommendations for cart items", async () => {
    // Add items to the cart
    await Cart.create({
      userId,
      items: [
        { productId: product1._id, quantity: 2 },
        { productId: product2._id, quantity: 3 },
      ],
    });

    // Mock Ollama function response
    generateRecipeRecommendations.mockResolvedValue({
      response: ["Tomato Soup", "Onion Stir Fry"],
    });

    const response = await request(app).get(`/recipe-recommendations/${userId}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.recipes).toEqual(["Tomato Soup", "Onion Stir Fry"]);
    expect(response.body.ingredients).toEqual([
      { name: "Tomato", quantity: 2 },
      { name: "Onion", quantity: 3 },
    ]);
  });

  test("Should return 404 if cart is empty", async () => {
    const response = await request(app).get(`/recipe-recommendations/${userId}`);

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Cart is empty. Add ingredients to get recipe recommendations.");
  });

  test("Should handle errors correctly", async () => {
    jest.spyOn(Cart, "findOne").mockImplementation(() => {
      throw new Error("Database error");
    });

    const response = await request(app).get(`/recipe-recommendations/${userId}`);

    expect(response.status).toBe(500);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Failed to generate recipe recommendations");
    expect(response.body.error).toBe("Database error");

    jest.restoreAllMocks();
  });
});
