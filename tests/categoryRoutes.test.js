const request = require("supertest");
const app = require("../server"); // If using `server.js`
 // Your Express app
const Category = require("../models/Category");

// Mock the Category model
jest.mock("../models/Category");

describe("Category Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ✅ Test: Get all categories
  test("GET /categories should return a list of categories", async () => {
    const mockCategories = [
      { _id: "1", name: "Electronics" },
      { _id: "2", name: "Clothing" },
    ];

    Category.find.mockResolvedValue(mockCategories);

    const response = await request(app).get("/categories");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockCategories);
  });

  // ✅ Test: Return 500 if there is a server error in GET categories
  test("GET /categories should return 500 on server error", async () => {
    Category.find.mockRejectedValue(new Error("Database error"));

    const response = await request(app).get("/categories");

    expect(response.status).toBe(500);
    expect(response.body.message).toBe("Database error");
  });

  // ✅ Test: Create a new category
  test("POST /categories should create a new category", async () => {
    const newCategory = { _id: "3", name: "Books" };
    Category.prototype.save.mockResolvedValue(newCategory);

    const response = await request(app).post("/categories").send({ name: "Books" });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(newCategory);
  });

  // ✅ Test: Return 400 if category name is missing
  test("POST /categories should return 400 if category name is missing", async () => {
    const response = await request(app).post("/categories").send({});

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Category name is required");
  });

  // ✅ Test: Return 500 on server error when creating a category
  test("POST /categories should return 500 if there is a server error", async () => {
    Category.prototype.save.mockRejectedValue(new Error("Database error"));

    const response = await request(app).post("/categories").send({ name: "Books" });

    expect(response.status).toBe(500);
    expect(response.body.message).toBe("Database error");
  });
});
