const mongoose = require("mongoose");

const { Types } = require("mongoose");

const LiverSchema = new mongoose.Schema({
  age: Number,
  sex: Boolean,
  total_bilirubin: Number,
  alkaline_phosphotase: Number,
  alamine_aminotransferase: Number,
  albumin_and_globulin_ratio: Number,
  resualt: String,
  userID: {
    type: Types.ObjectId,
    ref: "User",
  },
});

const LiverModel = mongoose.model("Liver", LiverSchema);
module.exports = LiverModel;
