const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  age: {
    type: Number,
    required: false
  }
});

module.exports.User = mongoose.model("User", userSchema);