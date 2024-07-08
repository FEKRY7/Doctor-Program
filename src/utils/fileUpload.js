const multer = require("multer");

const fileUpload = () => {
  const fileFilter = (req, file, cb) => {
    console.log(file);
    const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg", "application/pdf"];
    
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(null, false);
    }

    cb(null, true);
  };

  return multer({
    storage: multer.diskStorage({}),
    fileFilter: fileFilter,
  });
};

module.exports = fileUpload;
