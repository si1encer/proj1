const mongoose = require("mongoose");

const connectTomongodb = () => {
  mongoose.connect(
    "mongodb+srv://user1:123456gz@cluster0.8zj9imc.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = mongoose.connection;
  db.on("error", console.error.bind(console), "connection error");
  db.on("open", () => {
    console.log("connect succeed");
  });
};
module.exports = connectTomongodb;
