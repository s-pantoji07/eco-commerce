const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = require("../server"); // If using `server.js`
const User = require("../models/User");
const connectDB = require("../config/connectDB"); 

jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

let mongoServer;

describe("User Authentication", () => {
    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
      
        if (mongoose.connection.readyState !== 0) {
          await mongoose.disconnect();
        }
      
        process.env.MONGO_URI = mongoUri; // Ensure tests use the in-memory database
      
        await connectDB(); // Use your app's DB connection logic
      });
      
      afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        await mongoServer.stop();
      });

  beforeEach(async () => {
    await User.deleteMany();
    await User.create({
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      mobileNumber: "1234567890",
      username: "john_doe",
      password: "hashedpassword", // Mocked bcrypt hash
    });
  });

  // ---- Register User Tests ----
  test("Should register a new user", async () => {
    const response = await request(app).post("/api/auth/register").send({
      firstName: "Jane",
      lastName: "Doe",
      email: "jane@example.com",
      mobileNumber: "9876543210",
      username: "jane_doe",
      password: "password123",
    });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("User registered successfully");

    const newUser = await User.findOne({ email: "jane@example.com" });
    expect(newUser).toBeTruthy();
  });

  test("Should return 400 if user already exists", async () => {
    const response = await request(app).post("/api/auth/register").send({
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      mobileNumber: "1234567890",
      username: "john_doe",
      password: "password123",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("User already exists");
  });

  test("Should return 500 if an error occurs", async () => {
    jest.spyOn(User, "findOne").mockImplementation(() => {
      throw new Error("Database error");
    });

    const response = await request(app).post("/api/auth/register").send({
      firstName: "Test",
      lastName: "User",
      email: "test@example.com",
      mobileNumber: "1111111111",
      username: "test_user",
      password: "password123",
    });

    expect(response.status).toBe(500);
    expect(response.body.message).toBe("Server error");

    jest.restoreAllMocks();
  });

  // ---- Login User Tests ----
  test("Should log in a user with valid credentials", async () => {
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue("mockedToken");

    const response = await request(app).post("/api/auth/login").send({
      email: "john@example.com",
      password: "password123",
    });

    expect(response.status).toBe(200);
    expect(response.body.token).toBe("mockedToken");
    expect(response.body.user).toEqual({
      id: expect.any(String),
      username: "john_doe",
      email: "john@example.com",
    });
  });

  test("Should return 400 if email is invalid", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "invalid@example.com",
      password: "password123",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid credentials");
  });

  test("Should return 400 if password is incorrect", async () => {
    bcrypt.compare.mockResolvedValue(false);

    const response = await request(app).post("/api/auth/login").send({
      email: "john@example.com",
      password: "wrongpassword",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid credentials");
  });

  test("Should return 500 if an error occurs", async () => {
    jest.spyOn(User, "findOne").mockImplementation(() => {
      throw new Error("Database error");
    });

    const response = await request(app).post("/api/auth/login").send({
      email: "john@example.com",
      password: "password123",
    });

    expect(response.status).toBe(500);
    expect(response.body.message).toBe("Server error");

    jest.restoreAllMocks();
  });
});
