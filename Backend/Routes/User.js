const express = require("express");
const router = express.Router();
const User = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AuthenticateUser = require("../Auth/UserAuth");
require("dotenv").config()
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
 if (!username || !email || !password) {
    return res.status(404).json({ message: "All fields are required" });
  }
  
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&^])[A-Za-z\d@$!%*?#&^]{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message:
        "Password must be at least 8 characters long, include uppercase, lowercase, number and special character",
    });
  }

  try {
    const checkuser = await User.findOne({ email });
    if (checkuser) {
      return res.status(409).json({ message: "Username Already Registered" });
    }

    const user = new User({
      username,
      email,
      password,
    });
    user.password = await bcrypt.hash(password, 10);
    await user.save();
    res.status(200).json({ message: "Signed Up Successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ message: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const identity = await User.findOne({ email });
    if (!identity)
      return res
        .status(404)
        .json({ message: "Username or Password is Invalid" });
    const passcheck = await bcrypt.compare(password, identity.password);
    if (!passcheck)
      return res
        .status(404)
        .json({ message: "Username or Password is Invalid" });

    const token = jwt.sign(
      { id: identity._id, email: identity.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    console.log(token);

    res.status(201).json({ message: "Login successfully!" ,user_id: identity._id});
  } catch (error) {
    console.log(console.error(error));
    res.status(500).json({ message: error.message });
  }
});

router.get("/logout", AuthenticateUser, async (req, res) => {
  console.log("logout hit");
  
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
   res.status(200).json({
      message: "Login Successfully!",
    }); 
});
module.exports = router;
