const request = require("supertest");
const app = require("../server"); // If using `server.js`
 // Your Express app
const Product = require("../models/Product");
const Category = require("../models/Category");

// Mock Mongoose models
jest.mock("../models/Product");
jest.mock("../models/Category");

describe("Product Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ✅ Test: Fetch all products (no filters)
  test("GET /products should return all products", async () => {
    const mockProducts = [
      { _id: "1", name: "Laptop", category: "Electronics" },
      { _id: "2", name: "Shoes", category: "Fashion" },
    ];

    Product.find.mockResolvedValue(mockProducts);

    const response = await request(app).get("/products");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockProducts);
  });

  // ✅ Test: Fetch products by category
  test("GET /products?category=Electronics should return products in the category", async () => {
    const mockCategory = { _id: "123", name: "Electronics" };
    const mockProducts = [{ _id: "1", name: "Laptop", category: "123" }];

    Category.findOne.mockResolvedValue(mockCategory);
    Product.find.mockResolvedValue(mockProducts);

    const response = await request(app).get("/products?category=Electronics");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockProducts);
  });

  // ✅ Test: Return 404 if category does not exist
  test("GET /products?category=NonExistentCategory should return 404", async () => {
    Category.findOne.mockResolvedValue(null);

    const response = await request(app).get("/products?category=NonExistentCategory");

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Category not found");
  });

  // ✅ Test: Fetch products by search query
  test("GET /products?search=Laptop should return matching products", async () => {
    const mockProducts = [{ _id: "1", name: "Laptop", category: "123" }];

    Product.find.mockResolvedValue(mockProducts);

    const response = await request(app).get("/products?search=Laptop");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockProducts);
  });

  // ✅ Test: Fetch products with pagination
  test("GET /products?page=2&limit=5 should return paginated products", async () => {
    const mockProducts = [
      { _id: "1", name: "Item 1" },
      { _id: "2", name: "Item 2" },
    ];

    Product.find.mockResolvedValue(mockProducts);

    const response = await request(app).get("/products?page=2&limit=5");

    expect(response.status).toBe(200);
    expect(Product.find).toHaveBeenCalledWith({});
    expect(Product.find().skip).toHaveBeenCalledWith(5);
    expect(Product.find().limit).toHaveBeenCalledWith(5);
  });

  // ✅ Test: Return 500 on server error
  test("GET /products should return 500 if there is a server error", async () => {
    Product.find.mockRejectedValue(new Error("Database error"));

    const response = await request(app).get("/products");

    expect(response.status).toBe(500);
    expect(response.body.message).toBe("Database error");
  });
});
