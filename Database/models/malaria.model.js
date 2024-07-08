const mongoose = require("mongoose");

const { Types } = require("mongoose");

const malariaSchema = new mongoose.Schema({
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

const malariaModel = mongoose.model("Malaria", malariaSchema);
module.exports = malariaModel;
