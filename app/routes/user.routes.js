const cors = require("cors");
module.exports = app => {
    const users = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    
    // Create a new user
    router.post("/", users.createUser);
    
    // Retrieve all users
    router.get("/", cors(), users.getAllUsers);
 
    // Update a user with id
    router.put("/:id", users.update);
  
    // Delete a user with id
    router.delete("/:id", users.delete);
  
    // Create a new user
    router.delete("/", users.deleteAll);
  
    app.use("/api/users", router);
  };