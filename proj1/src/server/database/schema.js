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

module.exports = userSchema;
