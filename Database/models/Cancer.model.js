const mongoose = require("mongoose");

const { Types } = require("mongoose");

const CancerSchema = new mongoose.Schema({
  radius_mean: Number,
  area_mean: Number,
  compactness_mean: Number,
  concavity_mean: Number,
  cpoints_mean: Number,
  area_worst: Number,
  compactness_worst: Number,
  concavity_worst: Number,
  area_se: Number,
  fractal_dimension_se: Number,
  symmetry_worst: Number,
  fractal_dimension_worst: Number,
  resualt: String,
  userID: {
    type: Types.ObjectId,
    ref: "User",
  },
});

const CancerModel = mongoose.model("Cancer", CancerSchema);
module.exports = CancerModel;
