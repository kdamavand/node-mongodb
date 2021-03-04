const cors = require("cors");
module.exports = app => {
  const stores = require("../controllers/store.controller.js");

  var router = require("express").Router();

  // Create many products
  //router.post("/createmany", stores.createMany);
  // Create a new product
  router.post("/", stores.create);

  // Retrieve all products
  router.get("/", cors(), stores.findAll);

  // Retrieve a single product with id
  router.get("/:id", stores.findOne);

  // Update a product with id
  router.put("/:id", stores.update);

  // Delete a product with id
  router.delete("/:id", stores.delete);

  // Create a new product
  router.delete("/", stores.deleteAll);

  app.use("/api/stores", router);
};
