const express = require("express");
const contentController = express.Router();
const { ContentModel } = require("../models/contentModel");
const { authUser } = require("../middlewares/authUser");
const { ValidationTypes } = require("../utils/validation");

contentController.post("/content", authUser, async (req, res) => {
  const { title, link, type, tags } = req.body;
  try {
    await ContentModel.create({
      title,
      link,
      type,
      tags,
      userId: req.userId,
    });

    res.json({
      message: "The Content Added",
    });
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
});

contentController.delete("/content", authUser, async (req, res) => {
  const { id } = req.body;
  try {
    await ContentModel.deleteOne({ _id: id });

    res.json({
      message: "Content Deleted",
    });
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
});

contentController.get("/content", authUser, async (req, res) => {
  try {
    const allContentsOfUser = await ContentModel.find({ userId: req.userId });

    res.json({
      data: allContentsOfUser,
    });
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
});

contentController.post("/content-type", authUser, async (req, res) => {
  try {
    if (!ValidationTypes(req.body.type))
      throw new Error("Selected type is Invalid");
    const allContentsOfUser = await ContentModel.find({ userId: req.userId });

    const filteredItems = allContentsOfUser.filter(
      (item) => item.type == req.body.type
    );

    res.json({
      data: filteredItems,
    });
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
});

module.exports = { contentController };
