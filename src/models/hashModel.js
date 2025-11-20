const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

const hashSchema = new mongoose.Schema({
  hash: String,
  userId: {
    type: objectId,
  },
});

const hashModel = mongoose.model("hash", hashSchema);

module.exports = { hashModel };
