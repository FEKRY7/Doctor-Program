const mongoose = require("mongoose");

const { Types } = require("mongoose");


const ChronicSchema = new mongoose.Schema({
 
  age:Number,
  blood_pressure:Number,
  specific_gravity:Number,
  albumin:Number,
  sugar:Number,
  red_blood_cells:Number,
  pus_cell:Number,
  pus_cell_clumps:Number,
  bacteria:Number,
  blood_glucose_random:Number,
  blood_urea:Number,
  serum_creatinine:Number,
  sodium:Number,
  potassium:Number,
  haemoglobin:Number,
  packed_cell_volume:Number,
  white_blood_cell_count:Number,
  red_blood_cell_count:Number,
  hypertension:Number,
  diabetes_mellitus:Number,
  coronary_artery_disease:Number,
  appetite:Number,
  peda_edema:Number,
  aanemia:Number,
  resualt:String,
  userID:{
    type:Types.ObjectId,
    ref:"User"
  }

})

const ChronicModel = mongoose.model("Chronic",ChronicSchema)
module.exports = ChronicModel