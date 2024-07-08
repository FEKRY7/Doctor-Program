const penumoniaModel = require("../../../Database/models/penumonia.model.js");
const cloudinary = require("../../utils/cloud.js");
const http = require("../../folderS,F,E/S,F,E.JS");
const { First, Second, Third } = require("../../utils/httperespons.js");

const penumoniaTest = async (req, res, next) => {
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
        { folder: "BookingProject/penumonia/" }
      );
      uploadedFiles.push({ id: public_id, url: secure_url });
    }
    req.body.image =
      uploadedFiles.length === 1 ? uploadedFiles[0] : uploadedFiles;

    const Test = await penumoniaModel.create(req.body);
    if (!Test) {
      return First(res, "fail to create test", 404, http.FAIL);
    }
    return Second(
      res,
      ["create penumonia sccessfuly", Test],
      200,
      http.SUCCESS
    );
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

const penumoniaRecord = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const Record = await penumoniaModel.find({ userID: _id });

    if (!Record) {
      return First(res, "not found any penumoniaTest", 404, http.FAIL);
    }
    return Second(res, ["your penumoniaTests", Record], 200, http.SUCCESS);
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

const Delete_penumoniaRecord = async (req, res, next) => {
  try {
    const { id } = req.params;

    const Record = await penumoniaModel.findOneAndDelete({
      userID: req.user._id,
      _id: id,
    });

    // delete image from cloudiniry
    await cloudinary.uploader.destroy(Record.image.id);

    if (!Record) {
      return First(res, "not found any penumoniaRecord", 404, http.FAIL);
    }
    return Second(
      res,
      `your penumoniaRecord whith Id:${id} has been deleted`,
      200,
      http.SUCCESS
    );
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

module.exports = {
  penumoniaTest,
  penumoniaRecord,
  Delete_penumoniaRecord,
};
