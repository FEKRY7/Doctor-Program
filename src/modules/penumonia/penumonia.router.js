const express = require("express");
const router = express.Router();

const isAuthenticated = require("../../middleware/authentication.middeleware.js");
const isAuthorized = require("../../middleware/authoriztion.middelware.js");
const fileUpload = require("../../utils/fileUpload.js");

const {
  penumoniaTest,
  penumoniaRecord,
  Delete_penumoniaRecord,
} = require("./penumonia.controller.js");

router.post(
  "/",
  isAuthenticated,
  isAuthorized("User"),
  fileUpload().array("image"),
  penumoniaTest
);

router.get("/", isAuthenticated, isAuthorized("User"), penumoniaRecord);

router.delete(
  "/:id",
  isAuthenticated,
  isAuthorized("User"),
  Delete_penumoniaRecord
);

module.exports = router;
