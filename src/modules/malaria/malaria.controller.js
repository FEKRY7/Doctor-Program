const malariaModel = require("../../../Database/models/malaria.model.js");
const cloudinary = require("../../utils/cloud.js");
const http = require("../../folderS,F,E/S,F,E.JS");
const { First, Second, Third } = require("../../utils/httperespons.js");

const malariaTest = async (req, res, next) => {
  try {
    req.body.userID = req.user._id;

    // Checking if an image file is uploaded
    if (!req.files || req.files.length === 0) {
      return First(res, "Image is required", 400, http.FAIL);
    }

    // Uploading the image to Cloudinary
    const uploadedFiles = [];
    for (const file of req.files) {
      const { secure_url, public_id } = await cloudinary.uploader.upload(
        file.path,
        { folder: "BookingProject/malaria/" }
      );
      uploadedFiles.push({ id: public_id, url: secure_url });
    }
    req.body.image =
      uploadedFiles.length === 1 ? uploadedFiles[0] : uploadedFiles;

    const Test = await malariaModel.create(req.body);
    if (!Test) {
      return First(res, "fail to create test", 404, http.FAIL);
    }
    return Second(res, ["create malaria sccessfuly", Test], 200, http.SUCCESS);
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

const GetmalariaRecord = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const Record = await malariaModel.find({ userID: _id });

    if (!Record) {
      return First(res, "not found any malariaTest", 404, http.FAIL);
    }
    return Second(res, ["your malariaTests", Record], 200, http.SUCCESS);
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

const DeletemalariaRecord = async (req, res, next) => {
  try {
    const { id } = req.params;

    const Record = await malariaModel.findOneAndDelete({
      userID: req.user._id,
      _id: id,
    });

    // delete image from cloudiniry
    await cloudinary.uploader.destroy(Record.image.id);

    if (!Record) {
      return First(res, "not found any malariaRecord", 404, http.FAIL);
    }
    return Second(
      res,
      `your  malariaRecord whith Id:${id} has been deleted`,
      200,
      http.SUCCESS
    );
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

module.exports = {
  malariaTest,
  GetmalariaRecord,
  DeletemalariaRecord,
};
