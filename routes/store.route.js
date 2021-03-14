const cors = require("cors");
const express = require("express");
const router = express.Router();
const controller = require("../controllers/store.controller");

router
  .route("/")
  .get(cors(), controller.getAllProducts)
  .post(controller.createProduct);
router
  .route("/:id")
  .get(controller.getProduct)
  .put(controller.updateProduct)
  .delete(controller.deleteProduct);

module.exports = router;
