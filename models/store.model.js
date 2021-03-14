const mongoose = require("mongoose");
const storeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false,
    minlength: 3,
    maxlength: 50
  },
  price: {
    type: Number,
    required: false
  },
  description: {
    type: String,
    required: false,
    minlength: 3,
    maxlength: 50
  },
  image: {
    type: String,
    required: false,
    minlength: 3,
    maxlength: 50
  },
  timestamps: {
    type: Date,
    require:true
  }
     
});
module.exports.Store = mongoose.model("Store", storeSchema);


