const HeartModel = require('../../../Database/models/Heart.model.js')
const http = require("../../folderS,F,E/S,F,E.JS");
const { First, Second, Third } = require("../../utils/httperespons.js");

const HeartTest = async (req, res, next) => {
  try {
    req.body.userID = req.user._id;    
    const Test = await HeartModel.create(req.body);

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

const GetHeartRecord = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const Record = await HeartModel.find({ userID: _id });

    if (!Record) {
      return First(res, "not found any HeartTest", 404, http.FAIL);
    }
    return Second(res, ["your HeartTest", Record], 200, http.SUCCESS);
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

const deleteHeartRecord = async (req, res, next) => {
  try {
    const { id } = req.params;

    const Record = await HeartModel.findOneAndDelete({
      userID: req.user._id,
      _id: id,
    });

    if (!Record) {
      return First(res, "not found any HeartRecord", 404, http.FAIL);
    }
    return Second(
      res,
      `your HeartRecord whith Id:${id} has been deleted`,
      200,
      http.SUCCESS
    );
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

module.exports = {
    HeartTest,
    GetHeartRecord,
    deleteHeartRecord
};




