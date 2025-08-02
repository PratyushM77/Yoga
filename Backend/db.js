const mongoose = require("mongoose");
require("dotenv").config()
mongoose.connect(
  process.env.URI
);
const db = mongoose.connection;
db.on("connected", () => {
  console.log("Connected to MongoDB cluster");
});
module.exports = db;
