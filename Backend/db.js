const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://Pratyush77:Pratyush2003@cluster0.lbuigvs.mongodb.net/"
);
const db = mongoose.connection;
db.on("connected", () => {
  console.log("Connected to MongoDB cluster");
});
module.exports = db;
