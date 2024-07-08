const mongoose = require("mongoose");

const { Types } = require("mongoose");

const penumoniaSchema = new mongoose.Schema({
  image: {
    id: { type: String },
    url: { type: String },
  },
  resualt: String,

  userID: {
    type: Types.ObjectId,
    ref: "User",
  },
});

const penumoniaModel = mongoose.model("penumonia", penumoniaSchema);
module.exports = penumoniaModel;
