const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../server"); // If using `server.js`
 // Import Express app
const Category = require("../models/Category");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri(), { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Category Controller Tests", () => {
  beforeEach(async () => {
    await Category.deleteMany({});
  });

  test("Should return all categories", async () => {
    await Category.insertMany([
      { name: "Electronics" },
      { name: "Clothing" },
    ]);

    const response = await request(app).get("/categories");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
    expect(response.body[0].name).toBe("Electronics");
    expect(response.body[1].name).toBe("Clothing");
  });

  test("Should return an empty array when no categories exist", async () => {
    const response = await request(app).get("/categories");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  test("Should handle server errors gracefully", async () => {
    jest.spyOn(Category, "find").mockImplementation(() => {
      throw new Error("Database error");
    });

    const response = await request(app).get("/categories");

    expect(response.status).toBe(500);
    expect(response.body.message).toBe("Database error");
  });
});
