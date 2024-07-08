const express = require("express");
const router = express.Router();

const isAuthenticated = require("../../middleware/authentication.middeleware.js");
const isAuthorized = require("../../middleware/authoriztion.middelware.js");
const fileUpload = require("../../utils/fileUpload.js");

const {
  malariaTest,
  GetmalariaRecord,
  DeletemalariaRecord,
} = require("./malaria.controller.js");
 
router.post(
  "/",
  isAuthenticated,
  isAuthorized("User"),
  fileUpload().array("image"),
  malariaTest
);
router.get("/", isAuthenticated, isAuthorized("User"), GetmalariaRecord);
router.delete(
  "/:id",
  isAuthenticated,
  isAuthorized("User"),
  DeletemalariaRecord
);

module.exports = router;
