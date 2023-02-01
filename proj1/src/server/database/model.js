const mongoose = require("mongoose");
const { userSchema, productSchema } = require("./schema");

const User = mongoose.model("User", userSchema);
const Product = mongoose.model("Product", productSchema);
module.exports = { User, Product };
