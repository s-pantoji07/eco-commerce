const request = require("supertest");
const app = require("../server"); // If using `server.js`
 // Your Express app
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Mock User model and dependencies
jest.mock("../models/User");
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

describe("User Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ✅ Test: Register a new user
  test("POST /users/register should create a new user", async () => {
    const newUser = {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      mobileNumber: "1234567890",
      username: "johndoe",
      password: "securePassword123",
    };

    User.findOne.mockResolvedValue(null);
    User.prototype.save.mockResolvedValue(newUser);

    const response = await request(app).post("/users/register").send(newUser);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("User registered successfully");
  });

  // ✅ Test: Prevent duplicate email registration
  test("POST /users/register should return 400 if email already exists", async () => {
    User.findOne.mockResolvedValue({ email: "john@example.com" });

    const response = await request(app).post("/users/register").send({
      email: "john@example.com",
      password: "securePassword123",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("User already exists");
  });

  // ✅ Test: Return 500 on server error when registering
  test("POST /users/register should return 500 on server error", async () => {
    User.findOne.mockRejectedValue(new Error("Database error"));

    const response = await request(app).post("/users/register").send({
      email: "john@example.com",
      password: "securePassword123",
    });

    expect(response.status).toBe(500);
    expect(response.body.message).toBe("Server error");
  });

  // ✅ Test: Login user successfully
  test("POST /users/login should return a JWT token if login is successful", async () => {
    const mockUser = {
      _id: "123",
      username: "johndoe",
      email: "john@example.com",
      password: "hashedPassword",
    };

    User.findOne.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue("mockJwtToken");

    const response = await request(app).post("/users/login").send({
      email: "john@example.com",
      password: "securePassword123",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token", "mockJwtToken");
    expect(response.body.user).toEqual({
      id: "123",
      username: "johndoe",
      email: "john@example.com",
    });
  });

  // ✅ Test: Prevent login with invalid credentials
  test("POST /users/login should return 400 for invalid credentials", async () => {
    User.findOne.mockResolvedValue(null);

    const response = await request(app).post("/users/login").send({
      email: "invalid@example.com",
      password: "wrongpassword",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid credentials");
  });

  // ✅ Test: Return 500 on server error when logging in
  test("POST /users/login should return 500 on server error", async () => {
    User.findOne.mockRejectedValue(new Error("Database error"));

    const response = await request(app).post("/users/login").send({
      email: "john@example.com",
      password: "securePassword123",
    });

    expect(response.status).toBe(500);
    expect(response.body.message).toBe("Server error");
  });
});
