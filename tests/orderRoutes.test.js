const request = require("supertest");
const app = require("../server"); // If using `server.js`
// Import Express app
const Order = require("../models/Order");
const { protect } = require("../middleware/authMiddleware");

jest.mock("../models/Order");
jest.mock("../middleware/authMiddleware", () => ({
  protect: (req, res, next) => {
    req.user = { _id: "user123" }; // Mock user authentication
    next();
  }
}));

describe("Order Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ✅ Test: Place an Order
  test("POST /orders should place an order", async () => {
    const mockOrder = {
      _id: "order123",
      userId: "user123",
      address: "123 Street, City",
      paymentMode: "Credit Card",
      totalAmount: 100,
      deliveryCharge: 5
    };

    Order.prototype.save.mockResolvedValue(mockOrder);

    const response = await request(app).post("/orders").send({
      address: "123 Street, City",
      paymentMode: "Credit Card",
      totalAmount: 100,
      deliveryCharge: 5
    });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Order placed successfully");
    expect(response.body.order).toEqual(mockOrder);
  });

  // ✅ Test: Missing Fields in Place Order
  test("POST /orders should return 400 for missing fields", async () => {
    const response = await request(app).post("/orders").send({
      paymentMode: "Credit Card",
      totalAmount: 100
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("All fields are required");
  });

  // ✅ Test: Get Orders for a User
  test("GET /orders should return a list of orders", async () => {
    const mockOrders = [
      { _id: "order1", userId: "user123", totalAmount: 100 },
      { _id: "order2", userId: "user123", totalAmount: 200 }
    ];

    Order.find.mockResolvedValue(mockOrders);

    const response = await request(app).get("/orders");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.orders).toEqual(mockOrders);
  });

  // ✅ Test: No Orders Found for a User
  test("GET /orders should return 404 if no orders are found", async () => {
    Order.find.mockResolvedValue([]);

    const response = await request(app).get("/orders");

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("No orders found");
  });

  // ✅ Test: Get Order by ID
  test("GET /orders/:id should return a specific order", async () => {
    const mockOrder = { _id: "order123", userId: "user123", totalAmount: 100 };

    Order.findById.mockResolvedValue(mockOrder);

    const response = await request(app).get("/orders/order123");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockOrder);
  });

  // ✅ Test: Order Not Found
  test("GET /orders/:id should return 404 if order does not exist", async () => {
    Order.findById.mockResolvedValue(null);

    const response = await request(app).get("/orders/order123");

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Order not found");
  });

  // ✅ Test: Server Error
  test("GET /orders should return 500 on server error", async () => {
    Order.find.mockRejectedValue(new Error("Database error"));

    const response = await request(app).get("/orders");

    expect(response.status).toBe(500);
    expect(response.body.message).toBe("Server error");
  });
});
