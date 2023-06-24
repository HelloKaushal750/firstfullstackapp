const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/User.model");
require("dotenv").config();

const userController = Router();

userController.post("/signup", (req, res) => {
  const { email, password, age } = req.body;
  bcrypt.hash(password, 5, async function (err, hash) {
    if (err) {
      res.send("Something went wrong, please try again later");
    }
    const user = UserModel.create({
      email,
      password: hash,
      age,
    });
    res.send("Signup successful");
  });
});

userController.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  const hash = user.password;
  bcrypt.compare(password, hash, function (err, result) {
    if (err) {
      res.send("Something went wrong, please try again later");
    }
    if (result) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      res.send({message:"Login Successful",token})
    } else {
      res.send("Invalid credentials, please signup if you haven't");
    }
  });
});

module.exports = { userController };
