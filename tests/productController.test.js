const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server"); // If using `server.js`
// Assuming `app.js` is where Express is set up
const Product = require("../models/Product");
const Category = require("../models/Category");

describe("GET /products", () => {
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
    await Product.deleteMany();
    await Category.deleteMany();
  });

  test("Should return all products when no category is provided", async () => {
    const product1 = new Product({ name: "Product 1", category: new mongoose.Types.ObjectId() });
    const product2 = new Product({ name: "Product 2", category: new mongoose.Types.ObjectId() });
    await product1.save();
    await product2.save();

    const response = await request(app).get("/products");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });

  test("Should return products of a specific category", async () => {
    const category = new Category({ name: "Electronics" });
    await category.save();

    const product = new Product({ name: "Laptop", category: category._id });
    await product.save();

    const response = await request(app).get("/products").query({ category: "Electronics" });

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].name).toBe("Laptop");
  });

  test("Should return 404 if category does not exist", async () => {
    const response = await request(app).get("/products").query({ category: "NonExistentCategory" });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Category not found");
  });

  test("Should return an empty array if category exists but has no products", async () => {
    const category = new Category({ name: "Books" });
    await category.save();

    const response = await request(app).get("/products").query({ category: "Books" });

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(0);
  });

  test("Should handle server errors", async () => {
    jest.spyOn(Product, "find").mockImplementation(() => {
      throw new Error("Database error");
    });

    const response = await request(app).get("/products");

    expect(response.status).toBe(500);
    expect(response.body.message).toBe("Server error");

    jest.restoreAllMocks();
  });
});
