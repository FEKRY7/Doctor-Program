const ChronicModel = require('../../../Database/models/Chronic.model.js')
const http = require("../../folderS,F,E/S,F,E.JS");
const { First, Second, Third } = require("../../utils/httperespons.js");

const ChronicTest = async (req, res, next) => {
  try {
    req.body.userID = req.user._id;    
    const Test = await ChronicModel.create(req.body);

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

const GetChronicRecord = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const Record = await ChronicModel.find({ userID: _id });

    if (!Record) {
      return First(res, "not found any ChronicTest", 404, http.FAIL);
    }
    return Second(res, ["your ChronicTest", Record], 200, http.SUCCESS);
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

const deleteChronicRecord = async (req, res, next) => {
  try {
    const { id } = req.params;

    const Record = await ChronicModel.findOneAndDelete({
      userID: req.user._id,
      _id: id,
    });

    if (!Record) {
      return First(res, "Not found any ChronicTest", 404, http.FAIL);
    }
    return Second(
      res,
      `your ChronicTest whith Id:${id} has been deleted`,
      200,
      http.SUCCESS
    );
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

module.exports = {
    ChronicTest,
    GetChronicRecord,
    deleteChronicRecord,
};