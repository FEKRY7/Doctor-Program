const CancerModel = require('../../../Database/models/Cancer.model.js')
const http = require("../../folderS,F,E/S,F,E.JS");
const { First, Second, Third } = require("../../utils/httperespons.js");

const CancerTest = async (req, res, next) => {
  try {
    req.body.userID = req.user._id;    
    const Test = await CancerModel.create(req.body);

    if (!Test) {
      return First(res, "fail to create test", 404, http.FAIL);
    }
    return Second(
      res,
      ["create test sccessfuly", Test],
      200,
      http.SUCCESS
    );
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

const GetCancerRecord = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const Record = await CancerModel.find({ userID: _id });

    if (!Record) {
      return First(res, "not found any CancerTest", 404, http.FAIL);
    }
    return Second(res, ["your CancerTest", Record], 200, http.SUCCESS);
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

const deleteCancerRecord = async (req, res, next) => {
  try {
    const { id } = req.params;

    const Record = await CancerModel.findOneAndDelete({
      userID: req.user._id,
      _id: id,
    });

    if (!Record) {
      return First(res, "not found any CancerRecord", 404, http.FAIL);
    }
    return Second(
      res,
      `your CancerRecord whith Id:${id} has been deleted`,
      200,
      http.SUCCESS
    );
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

module.exports = {
    CancerTest,
    GetCancerRecord,
    deleteCancerRecord,
};