const express = require("express");
const router = express.Router();

const isAuthenticated = require("../../middleware/authentication.middeleware.js");
const isAuthorized = require("../../middleware/authoriztion.middelware.js");

const {
  ChronicTest,
  GetChronicRecord,
  deleteChronicRecord,
} = require("./Chronic.controller.js");

router.post("/", isAuthenticated, isAuthorized("User"), ChronicTest);
router.get("/", isAuthenticated, isAuthorized("User"), GetChronicRecord);
router.delete(
  "/:id",
  isAuthenticated,
  isAuthorized("User"),
  deleteChronicRecord
);

module.exports = router;
