const express = require("express");
const { authUser } = require("../middlewares/authUser");
const { ContentModel } = require("../models/contentModel");
const shareController = express.Router();
const crypto = require("crypto");
const { hashModel } = require("../models/hashModel");

shareController.post("/share", authUser, async (req, res) => {
  try {
    const allContentsOfUser = await ContentModel.find({ userId: req.userId });

    const hash = crypto.randomBytes(6).toString("hex"); //a123

    await hashModel.create({
      items: allContentsOfUser,
      userId: req.userId,
      hash,
    });

    const link = `http://localhost:${process.env.PORT_NUMBER}/api/v1/share/${hash}`;

    res.json({
      link: link,
    });
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
});

shareController.get("/share/:hash", authUser, async (req, res) => {
  try {
    const hash = req.params.hash;

    const data = await hashModel.find({ hash });

    if (!data) {
      return res.status(404).json({ message: "Invalid link" });
    }

    res.json({
      data: data[0]?.items,
    });
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
});

module.exports = { shareController };
