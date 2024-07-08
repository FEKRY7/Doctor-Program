const express = require("express");
const router = express.Router();

const isAuthenticated = require("../../middleware/authentication.middeleware.js");
const isAuthorized = require("../../middleware/authoriztion.middelware.js");

const {
  CancerTest,
  GetCancerRecord,
  deleteCancerRecord,
} = require("./Cancer.controller.js");

router.post("/", isAuthenticated, isAuthorized("User"), CancerTest);
router.get("/", isAuthenticated, isAuthorized("User"), GetCancerRecord);
router.delete(
  "/:id",
  isAuthenticated,
  isAuthorized("User"),
  deleteCancerRecord
);

module.exports = router;
