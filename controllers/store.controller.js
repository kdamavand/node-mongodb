const mongoose = require("mongoose");
const { Store } = require("../models/store.model");

module.exports.getAllProducts = async (req, res) => {
  let products = await Store.find({});
  return res.send(products);
};
module.exports.getProduct = async (req, res) => {
  let productId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(productId))
    return res.status(400).send("Invalid object id");
  let product = await User.findById(productId);
  if (!product) return res.status(404).send("Product not found");
  return res.send(product);
};

module.exports.createProduct = async (req, res) => {
  let product = new Store({
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
    image: req.body.image
  });
  await product.save();
  return res.send(product);
};

module.exports.updateProduct = async (req, res) => {
  let productId = req.params.id;
  Store.findOneAndUpdate(productId, req.body, { new: true })
    .then(product => {
      return res.send(product);
    })
    .catch(err => {
      return res.status(500).send(err);
    });
};

module.exports.deleteProduct = async (req, res) => {
  let productId = req.params.id;
  await Store.findByIdAndRemove(productId);
  return res.send("Product deleted");
};