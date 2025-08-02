const express = require("express");
const app = express();
const db = require("./db");
const User = require("./Routes/User");
const userSession = require("./Routes/userSession")
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv")
const rateLimit = require("express-rate-limit");
dotenv.config({})
const helmet = require("helmet");
app.use(helmet());
// const mongoSanitize = require("express-mongo-sanitize");
// app.use(mongoSanitize());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, 
  message: "Too many requests, please try again later.",
});

app.use(limiter);

app.use(
  cors({
    origin: "https://yoga-frontend-wdvb.onrender.com",
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
