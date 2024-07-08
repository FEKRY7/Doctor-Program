const LiverModel = require("../../../Database/models/Liver.model.js");
const http = require("../../folderS,F,E/S,F,E.JS");
const { First, Second, Third } = require("../../utils/httperespons.js");

const liverTest = async (req, res, next) => {
  try {
    req.body.userID = req.user._id;
    const Test = await LiverModel.create(req.body);

    if (!Test) {
      return First(res, "fail to create test", 404, http.FAIL);
    }
    return Second(
      res,
      ["create livertest sccessfuly", Test],
      200,
      http.SUCCESS
    );
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

const GetliverRecord = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const Record = await LiverModel.find({ userID: _id });

    if (!Record) {
      return First(res, "not found any liverTest", 404, http.FAIL);
    }
    return Second(res, ["your liverTests ", Record], 200, http.SUCCESS);
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

const deleteliverRecord = async (req, res, next) => {
  try {
    const { id } = req.params;

    const Record = await LiverModel.findOneAndDelete({
      userID: req.user._id,
      _id: id,
    });

    if (!Record) {
      return First(res, "not found any liverRecord", 404, http.FAIL);
    }
    return Second(
      res,
      `your liverRecord whith Id:${id} has been deleted`,
      200,
      http.SUCCESS
    );
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

module.exports = {
  liverTest,
  GetliverRecord,
  deleteliverRecord,
};
