const express = require("express");
const router = express.Router();

const isAuthenticated = require("../../middleware/authentication.middeleware.js");
const isAuthorized = require("../../middleware/authoriztion.middelware.js");

const {
  liverTest,
  GetliverRecord,
  deleteliverRecord,
} = require("./liver.controller.js");

router.post("/", isAuthenticated, isAuthorized("User"), liverTest);
router.get("/", isAuthenticated, isAuthorized("User"), GetliverRecord);
router.delete("/:id", isAuthenticated, isAuthorized("User"), deleteliverRecord);

module.exports = router;
