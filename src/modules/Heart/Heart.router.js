const express = require("express");
const router = express.Router();

const isAuthenticated = require("../../middleware/authentication.middeleware.js");
const isAuthorized = require("../../middleware/authoriztion.middelware.js");

const {
  HeartTest,
  GetHeartRecord,
  deleteHeartRecord,
} = require("./Heart.controller.js");

router.post("/", isAuthenticated, isAuthorized("User"), HeartTest);
router.get("/", isAuthenticated, isAuthorized("User"), GetHeartRecord);
router.delete("/:id", isAuthenticated, isAuthorized("User"), deleteHeartRecord);

module.exports = router;
