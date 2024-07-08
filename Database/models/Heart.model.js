const mongoose = require("mongoose");

const { Types } = require("mongoose");

const HeartSchema = new mongoose.Schema({
  age: Number,
  sex: Boolean,
  cp: Number,
  trestbps: Number,
  chol: Number,
  fbs: Number,
  restecg: Number,
  thalach: Number,
  exang: Number,
  oldpeak: Number,
  slope: Number,
  ca: Number,
  thal: Number,
  resualt: String,
  userID: {
    type: Types.ObjectId,
    ref: "User",
  },
});

const HeartModel = mongoose.model("Hear", HeartSchema);
module.exports = HeartModel;
