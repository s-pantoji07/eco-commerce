const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../server"); // If using `server.js`
const Order = require("../models/Order");

// Use a fixed, valid MongoDB ObjectId string instead of generating one
const VALID_MONGO_ID = "507f1f77bcf86cd799439011";

// Mock the JWT verify function for testing
jest.mock("jsonwebtoken", () => {
  return {
    verify: jest.fn().mockImplementation(() => {
      return { userId: VALID_MONGO_ID };
    })
  };
});

// Mock User model to return a test user
jest.mock("../models/User", () => {
  return {
    findById: jest.fn().mockImplementation(() => {
      return {
        select: jest.fn().mockReturnValue({
          _id: VALID_MONGO_ID,
          name: "Test User",
          email: "test@example.com"
        })
      };
    })
  };
});

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri(), { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
  // Make sure to close any hanging connections
  if (app.close) {
    app.close();
  }
});

describe("Order Controller Tests", () => {
  const validTestToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1MDdmMWY3N2JjZjg2Y2Q3OTk0MzkwMTEiLCJpYXQiOjE1MTYyMzkwMjJ9.fake_signature_for_testing';

  beforeEach(async () => {
    await Order.deleteMany({});
  });

  test("Should place an order successfully", async () => {
    const orderData = {
      address: "123 Street, City",
      paymentMode: "Credit Card",
      totalAmount: 100,
      deliveryCharge: 5,
    };

    const response = await request(app)
      .post("/api/orders")
      .set("Authorization", `Bearer ${validTestToken}`)
      .send(orderData);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Order placed successfully");
    expect(response.body.order).toHaveProperty("_id");
  });

  test("Should return validation error for missing fields", async () => {
    const response = await request(app)
      .post("/api/orders")
      .set("Authorization", `Bearer ${validTestToken}`)
      .send({});

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("All fields are required");
  });

  test("Should get user orders", async () => {
    // Create a test order associated with the user
    await Order.create({ 
      userId: VALID_MONGO_ID, 
      address: "Test Address", 
      paymentMode: "PayPal", 
      totalAmount: 50, 
      deliveryCharge: 3 
    });

    const response = await request(app)
      .get("/api/orders")
      .set("Authorization", `Bearer ${validTestToken}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.orders.length).toBeGreaterThan(0);
  });

  test("Should return error if no orders found", async () => {
    // Ensure no orders exist for this test
    await Order.deleteMany({ userId: VALID_MONGO_ID });
    
    const response = await request(app)
      .get("/api/orders")
      .set("Authorization", `Bearer ${validTestToken}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("No orders found");
  });

  test("Should get order by ID", async () => {
    const order = await Order.create({ 
      userId: VALID_MONGO_ID, 
      address: "Test Address", 
      paymentMode: "PayPal", 
      totalAmount: 50, 
      deliveryCharge: 3 
    });

    const response = await request(app)
      .get(`/api/orders/${order._id}`)
      .set("Authorization", `Bearer ${validTestToken}`);

    expect(response.status).toBe(200);
    expect(response.body._id).toBe(order._id.toString());
  });

  test("Should return 404 for invalid order ID", async () => {
    const response = await request(app)
      .get("/api/orders/invalidID")
      .set("Authorization", `Bearer ${validTestToken}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Order not found");
  });
});