const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  isLogin: {
    type: Boolean,
    default: false,
  },
  id: {
    type: String,
    require: true,
  },
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  quantity: {
    type: Number,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  srclink: {
    type: String,
    require: true,
  },
  id: {
    type: String,
    require: true,
  },
  time: {
    type: Object,
  },
});
module.exports = { userSchema, productSchema };
