const request = require("supertest");
const app = require("../server"); // If using `server.js`
// Your Express app
const mongoose = require("mongoose");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Mock Data
const userId = new mongoose.Types.ObjectId();
const productId = new mongoose.Types.ObjectId();
const itemId = new mongoose.Types.ObjectId();

jest.mock("../models/Cart"); // Mock Cart Model
jest.mock("../models/Product"); // Mock Product Model

describe("Cart Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ✅ Test: Add an item to the cart
  test("POST /cart/add should add an item to the cart", async () => {
    Product.findById.mockResolvedValue({ _id: productId, price_after_discount: 100 });

    Cart.findOne.mockResolvedValue(null);
    Cart.prototype.save.mockResolvedValue({
      userId,
      items: [{ productId, quantity: 1, price: 100 }],
      totalPrice: 100,
    });

    const response = await request(app).post("/cart/add").send({
      userId,
      productId,
      quantity: 1,
    });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.cart.items[0].productId).toBe(String(productId));
  });

  // ✅ Test: Get the user's cart
  test("GET /cart/:userId should return the user's cart", async () => {
    Cart.findOne.mockResolvedValue({
      userId,
      items: [{ productId, quantity: 2, price: 100 }],
      totalPrice: 200,
    });

    const response = await request(app).get(`/cart/${userId}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.cart.totalPrice).toBe(200);
  });

  // ✅ Test: Remove an item from the cart
  test("DELETE /cart/:userId/:itemId should remove an item from the cart", async () => {
    Cart.findOne.mockResolvedValue({
      userId,
      items: [{ _id: itemId, productId, quantity: 2, price: 100 }],
      totalPrice: 200,
    });

    Cart.prototype.save.mockResolvedValue({
      userId,
      items: [],
      totalPrice: 0,
    });

    const response = await request(app).delete(`/cart/${userId}/${itemId}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Cart is now empty");
  });

  // ✅ Test: Handle non-existent cart
  test("GET /cart/:userId should return 404 if the cart is empty", async () => {
    Cart.findOne.mockResolvedValue(null);

    const response = await request(app).get(`/cart/${userId}`);

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Cart is empty");
  });

  // ✅ Test: Return 400 for invalid quantity in add to cart
  test("POST /cart/add should return 400 if quantity is invalid", async () => {
    const response = await request(app).post("/cart/add").send({
      userId,
      productId,
      quantity: 0,
    });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Quantity must be at least 1");
  });

  // ✅ Test: Return 404 if product does not exist
  test("POST /cart/add should return 404 if product is not found", async () => {
    Product.findById.mockResolvedValue(null);

    const response = await request(app).post("/cart/add").send({
      userId,
      productId,
      quantity: 1,
    });

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Product not found");
  });

  // ✅ Test: Return 404 if removing an item from a non-existent cart
  test("DELETE /cart/:userId/:itemId should return 404 if cart is not found", async () => {
    Cart.findOne.mockResolvedValue(null);

    const response = await request(app).delete(`/cart/${userId}/${itemId}`);

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Cart not found");
  });
});
