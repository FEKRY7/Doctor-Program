const mongoose = require("mongoose");

const { Types } = require("mongoose");

const DiabetesSchema = new mongoose.Schema({
  Pregnancies: Number,
  Glucose: Number,
  BloodPressure: Number,
  SkinThickness: Number,
  Insulin: Number,
  BMI: Number,
  DiabetesPedigreeFunction: Number,
  Age: Number,
  resualt: String,
  userID: {
    type: Types.ObjectId,
    ref: "User",
  },
});

const DiabetesModel = mongoose.model("Diabetes", DiabetesSchema);
module.exports = DiabetesModel;
