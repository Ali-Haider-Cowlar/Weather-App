/* eslint-disable no-undef */

const request = require("supertest");
const userService = require("../services/user.service");
const mongoose = require("mongoose");

const { app, startServer } = require("../app");

beforeAll(() => startServer());
afterAll(() => mongoose.disconnect());

describe("User API", () => {
  // Test for getAllUsers API
  describe("GET /user", () => {
    it("should return all users", async () => {
      const response = await request(app).get("/user");
      expect(response.statusCode).toBe(200);
      expect(response.body.users).toBeTruthy();
      expect(response.body.users.length).toBeGreaterThan(0);
    });
  });
});
// Test for getById API
describe("GET /user/:id", () => {
  beforeAll(async () => {
    const user = await userService.addUser(
      "John Doe",
      "john@example.com",
      "1234567890123",
      "password"
    );
    testUserId = user._id;
  });

  it("should return a user by ID", async () => {
    const response = await request(app).get(`/user/${testUserId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.user).toBeTruthy();
    expect(response.body.user._id).toBe(testUserId.toString());
  });

  it("should return an error for an invalid user ID", async () => {
    const response = await request(app).get("/user/invalid-id");
    expect(response.statusCode).toBe(500);
    expect(response.body.message).toBe("Internal Server Error");
  });

  afterAll(async () => {
    await userService.deleteUser(testUserId);
  });
});

// Test for addUser API
describe("POST /user", () => {
  it("should add a new user", async () => {
    const response = await request(app).post("/user").send({
      name: "Jane Doe",
      email: "jane@example.com",
      cnic: "9876543210987",
      password: "password",
    });
    expect(response.statusCode).toBe(201);
    expect(response.body.user).toBeTruthy();
    expect(response.body.user.name).toBe("Jane Doe");
    expect(response.body.user.email).toBe("jane@example.com");
    expect(response.body.user.cnic).toBe("9876543210987");
  });

  afterAll(async () => {
    const users = await userService.getAllUsers();
    const janeDoe = users.find((user) => user.name === "Jane Doe");
    if (janeDoe) {
      await userService.deleteUser(janeDoe._id);
    }
  });
});

// Test for updateUser API
describe("PUT /user/:id", () => {
    beforeAll(async () => {
      const user = await userService.addUser(
        "John Doe",
        "john@example.com",
        "1234567890123",
        "password"
      );
      testUserId = user._id;
    });
  
    it("should update a user by ID", async () => {
      const response = await request(app).put(`/user/${testUserId}`).send({
        name: "John Doe",
        email: "john.doe@example.com",
        cnic: "1234567890123",
        password: "new-password",
      });
      expect(response.statusCode).toBe(200);
      expect(response.body.user).toBeTruthy();
      expect(response.body.user.email).toBe("john.doe@example.com");
      expect(response.body.user.password).toBe("new-password");
    });
  
    it("should return an error for an invalid user ID", async () => {
      const response = await request(app)
        .put("/user/invalid-id")
        .send({ name: "John Doe" });
      expect(response.statusCode).toBe(500);
      expect(response.body.message).toBe("Internal Server Error");
    });
  
    it("should delete a user by ID", async () => {
      const response = await request(app).delete(`/user/${testUserId}`);
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe("User Successfully Deleted");
    });
  
    afterAll(async () => {
      const users = await userService.getAllUsers();
      const johnDoe = users.find((user) => user.name === "John Doe");
      if (johnDoe) {
        await userService.deleteUser(johnDoe._id);
      }
    });
  });
  