const DiabetesModel = require("../../../Database/models/Diabetes.model.js");
const http = require("../../folderS,F,E/S,F,E.JS");
const { First, Second, Third } = require("../../utils/httperespons.js");

const DiabetesTest = async (req, res, next) => {
  try {
    req.body.userID = req.user._id;
    const Test = await DiabetesModel.create(req.body);

    if (!Test) {
      return First(res, "fail to create test", 404, http.FAIL);
    }
    return Second(res, ["create test sccessfuly", Test], 200, http.SUCCESS);
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

const GetDiabetesRecord = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const Record = await DiabetesModel.find({ userID: _id });

    if (!Record) {
      return First(res, "not found any DiabetesTest", 404, http.FAIL);
    }
    return Second(res, ["your DiabetesTests", Record], 200, http.SUCCESS);
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

const deleteDiabetesRecord = async (req, res, next) => {
  try {
    const { id } = req.params;

    const Record = await DiabetesModel.findOneAndDelete({
      userID: req.user._id,
      _id: id,
    });

    if (!Record) {
      return First(res, "not found any DiabetesRecord", 404, http.FAIL);
    }
    return Second(
      res,
      `your DiabetesRecord whith Id:${id} has been deleted`,
      200,
      http.SUCCESS
    );
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

module.exports = {
  DiabetesTest,
  GetDiabetesRecord,
  deleteDiabetesRecord,
};
