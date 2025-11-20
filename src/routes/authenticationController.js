const express = require("express");
const { UserModel } = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authenticationController = express.Router();

authenticationController.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashPassword = await bcrypt.hash(password, 10);
    await UserModel.create({
      username,
      password: hashPassword,
    });

    res.status(200).json({
      message: "User Signup Succcessful",
    });
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
});

authenticationController.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username });
    if (!user) throw new Error("User Not Found");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Invalid Credentials");

    //generatiing the json webtoken

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.cookie("token", token);

    res.json({
      message: "User Loggin Successful!",
    });
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
});

authenticationController.post("/logout", async (req, res) => {
  try {
    res.cookie("token", null, { expires: new Date(Date.now()) });
    res.json({
      message: "User Logout Successful!",
    });
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
});

module.exports = { authenticationController };
