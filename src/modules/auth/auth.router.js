const express = require("express");
const router = express.Router();
const { validation } = require("../../middleware/validation.middleware.js");
const fileUpload = require('../../utils/fileUpload.js')

const {
  SignUp,
  activateAcountSchema,
  SignIn,
  Reset
} = require("./auth.validation.js");

const {
  signUp,
  signIn,
  activeAccount,
  Refreshtoken,
  sendAccessCode,
  ResetPassword,
  displayUser
} = require("./auth.controller.js");

router.post("/signUp", fileUpload().array("image"), validation(SignUp), signUp);

router.get(
  "/activate_account/:token",
  validation(activateAcountSchema),
  activeAccount
);

router.post("/signIn", validation(SignIn), signIn);

router.post("/refreshtoken", Refreshtoken);

router.put("/sendAccessCode", sendAccessCode);

router.put("/forgetPassword", validation(Reset), ResetPassword);

router.get("/:id",displayUser)

module.exports = router;
