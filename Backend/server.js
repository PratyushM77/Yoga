const express = require("express");
const app = express();
const db = require("./db");
const User = require("./Routes/User");
const userSession = require("./Routes/userSession")
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv")
dotenv.config({})

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.get("/", (req, res) => {
  res.send("Hello from server");
});
app.use(express.json());
app.use(cookieParser());
app.use("/", User);
app.use("/",userSession)
app.listen(3000, () => {
  console.log("Server listening on Port 3000");
});
