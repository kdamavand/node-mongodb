const expect = require("chai").expect;
const request = require("supertest");
const { User } = require("../models/user.model");
const app = require("../app");
const mongoose = require('mongoose');
const config = require('../config');
const env = process.env.NODE_ENV || 'test';

let userId = '';

describe("api/users", () => {
  before(async () => {
    await User.deleteMany({});
  });

  after(async () => {
    mongoose.disconnect();
  });

  it("should connect and disconnect to mongodb", async () => {
      // console.log(mongoose.connection.states);
      mongoose.disconnect();
      mongoose.connection.on('disconnected', () => {
        expect(mongoose.connection.readyState).to.equal(0);
      });
      mongoose.connection.on('connected', () => {
        expect(mongoose.connection.readyState).to.equal(1);
      });
      mongoose.connection.on('error', () => {
        expect(mongoose.connection.readyState).to.equal(99);
      });

      await mongoose.connect(config.db[env], config.dbParams);
  });

  describe("GET/:id", () => {
    it("should return a user if valid id is passed", async () => {
      const user = new User({
        username: "florian",
        password: "test123",
        age: 23
      });
      await user.save();
      const res = await request(app).get("/api/users/" + user._id);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("username", user.username);
    });

    describe("GET /", () => {
      it("should return all users", async () => {
        const res = await request(app).get("/api/users");
        expect(res.status).to.equal(200);
        expect(res.body.length > 0);
      });
    });

    it("should return 400 error when invalid object id is passed", async () => {
      const res = await request(app).get("/api/users/1");
      expect(res.status).to.equal(400);
    });

    it("should return 404 error when valid object id is passed but does not exist", async () => {
      const res = await request(app).get("/api/users/5f43ef20c1d4a133e4628181");
      expect(res.status).to.equal(404);
    });
  });

  describe("POST /", () => {
    it("should return user when the all request body is valid", async () => {
      const res = await request(app)
        .post("/api/users")
        .send({
          username: "Armin",
          password: "test123",
          age: 41
        });
      const data = res.body;
      expect(res.status).to.equal(200);
      expect(data).to.have.property("_id");
      expect(data).to.have.property("username", "Armin");
      expect(data).to.have.property("password", "test123");
      expect(data.username).to.have.length.within(3, 50);
      

      const user = await User.findOne({ username: 'Armin' });
      expect(user.username).to.equal('Armin');
  
    });
  });

  describe("PUT /:id", () => {
    it("should update the existing user and return 200", async() => {
        const user = new User({
            username: "Arasto",
            password: "test123",
            age: 30
        });
        await user.save();

        const res = await request(app)
            .put("/api/users/" + user._id)
            .send({
                username: "Arasto",
                password: "test123",
                age: 30
            });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("username", "Arasto");
      expect(res.body).to.have.property("password", "test123");
      expect(res.body).to.have.property("age", 30);
    });
  });

 
  describe("DELETE /:id", () => {
    it("should delete requested id and return response 200", async () => {
      const user = new User({
        username: "Arasto",
        password: "test123",
        age: 30
      });
      await user.save();
      userId = user._id;
      const res = await request(app).delete("/api/users/" + userId);
      expect(res.status).to.be.equal(200);
    });

    it("should return 404 when deleted user is requested", async () => {
      let res = await request(app).get("/api/users/" + userId);
      expect(res.status).to.be.equal(404);
    });
  });
});