const express = require("express");
const router = express.Router();

const isAuthenticated = require("../../middleware/authentication.middeleware.js");
const isAuthorized = require("../../middleware/authoriztion.middelware.js");

const {
  DiabetesTest,
  GetDiabetesRecord,
  deleteDiabetesRecord,
} = require("./Diabetes.controller.js");

router.post("/", isAuthenticated, isAuthorized("User"), DiabetesTest);

router.get("/", isAuthenticated, isAuthorized("User"), GetDiabetesRecord);

router.delete(
  "/:id",
  isAuthenticated,
  isAuthorized("User"),
  deleteDiabetesRecord
);

module.exports = router;


