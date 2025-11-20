const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

const contentTypes = ["image", "video", "article", "audio"];
const contentSchema = new mongoose.Schema({
  title: String,
  link: String,
  tags: [String],
  type: {
    type: String,
    enum: contentTypes,
  },
  userId: {
    type: objectId,
  },
});

const ContentModel = mongoose.model("content", contentSchema);
module.exports = {
  ContentModel,
};
