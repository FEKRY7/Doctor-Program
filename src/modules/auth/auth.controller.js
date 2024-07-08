const jwt = require("jsonwebtoken");
const tokenModel = require("../../../Database/models/token.model.js");
const UserModel = require("../../../Database/models/User.model.js");
const bcryptjs = require("bcrypt");
const sendEmail = require("../../utils/sendEmail.js");
const signUpTemplate = require("../../utils/htmlTemplets.js");
const http = require("../../folderS,F,E/S,F,E.JS");
const { First, Second, Third } = require("../../utils/httperespons.js");
const cloudinary = require("../../utils/cloud.js");

const signUp = async (req, res) => {
  try {
    // Checking if the email already exists
    const isUser = await UserModel.findOne({ email: req.body.email });
    if (isUser) {
      return First(res, "User already exists", 409, http.FAIL);
    }

    // Hashing the password
    req.body.password = bcryptjs.hashSync(req.body.password, 8);

    // Creating the token
    const token = jwt.sign(
      { email: req.body.email, id: req.body._id },
      process.env.JWT_SECRET_KEY
    );

    // Checking if an image file is uploaded
    if (!req.files || req.files.length === 0) {
      return First(res, "Image is required", 400, http.FAIL);
    }

    // Uploading the image to Cloudinary
    const uploadedFiles = [];
    for (const file of req.files) {
      const { secure_url, public_id } = await cloudinary.uploader.upload(
        file.path,
        { folder: `BookingProject/User/${req.body.userName}` }
      );
      uploadedFiles.push({ id: public_id, url: secure_url });
    }
    req.body.image =
      uploadedFiles.length === 1 ? uploadedFiles[0] : uploadedFiles;

    // Creating the user
    const user = await UserModel.create(req.body);

    // Preparing the activation email
    const html = signUpTemplate(
      `http://localhost:3000/api/auth/activate_account/${token}`
    );

    // Sending the activation email
    const messageSent = await sendEmail({
      to: user.email,
      subject: "Account Activation",
      html,
    });
    if (!messageSent) {
      return First(res, "Failed to send activation email", 400, http.FAIL);
    }

    Second(
      res,
      ["User Created, Please activate your account", token],
      201,
      http.SUCCESS
    );
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

const activeAccount = async (req, res) => {
  try {
    // receving the token from the params
    const { token } = req.params;
    // decoding the token to get the payload
    const payLoad = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // Searching for the user in DataBase
    const isUser = await UserModel.findOneAndUpdate(
      { email: payLoad.email },
      { confirmEmail: true },
      { new: true }
    );
    if (!isUser) {
      return First(res, "User not found.", 404, http.FAIL);
    }

    Second(
      res,
      ["Account Activated , Try to login ", isUser],
      200,
      http.SUCCESS
    );
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

const signIn = async (req, res) => {
  try {
    // distructing the req.body
    const { email, password } = req.body;
    // searching for the user in database
    const isUser = await UserModel.findOne({ email });
    if (!isUser) {
      return First(res, "Invalid Email", 404, http.FAIL);
    }
    // making sure that the user has activated the account
    if (!isUser.confirmEmail) {
      return First(res, "Please Confirm your email", 400, http.FAIL);
    }
    // comparing the hashed password with the req.body password
    const match = await bcryptjs.compare(password, isUser.password);
    console.log(isUser);
    // sending a response if the passwords dosent match
    if (!match) {
      return First(res, "Invalid password", 400, http.FAIL);
    }
    // creating a token for using it in authentication and autorization
    const token = jwt.sign(
      { email, id: isUser._id },
      process.env.JWT_SECRET_KEY
    );
    // saving the token in token model (this an  optional  step)
    await tokenModel.create({ token, user: isUser._id });
    // sending the response
    return Second(res, ["you are loggedin", token], 200, http.SUCCESS);
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

const sendAccessCode = async (req, res, next) => {
  try {
    const { email } = req.body;
    const isUser = await UserModel.findOne({ email });
    if (!isUser) {
      return First(res, "Invalid Email", 404, http.FAIL);
    } else {
      const accessCode = Math.floor(Math.random() * 9000) + 1000;
      console.log({ bb: accessCode });
      // Update the user's access code
      const updatedUser = await UserModel.findOneAndUpdate(
        { email },
        { accesscode: accessCode },
        { new: true }
      );
      const html = `<p> Your access code is: ${accessCode} </p>`;
      const messageSent = await sendEmail({
        to: updatedUser.email,
        subject: "Access Code",
        html,
      });
      if (!messageSent) {
        return First(res, "Failed to send activation email.", 400, http.FAIL);
      }

      return Second(
        res,
        "accessCode sended  check your email",
        200,
        http.SUCCESS
      );
    }
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

const ResetPassword = async (req, res, next) => {
  try {
    const { email, accessCode, password } = req.body;
    const user = await UserModel.findOne({ email, accessCode });

    if (!user) {
      return First(res, "user not register", 404, http.FAIL);
    } else {
      if (!password) {
        return First(res, "New password is missing", 400, http.FAIL);
      }
      const hashPassword = bcryptjs.hashSync(password, 3);

      const ResetPassword = await UserModel.findOneAndUpdate(
        { email },
        { password: hashPassword, accesscode: "" },
        { new: true }
      );
      return Second(res, "password updated", 200, http.SUCCESS);
    }
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

const Refreshtoken = async (req, res, next) => {
  try {
    const { email } = req.body;

    const userFound = await UserModel.findOne({ email });
    if (!userFound) {
      return First(res, "User Not Found", 404, http.FAIL);
    }
    console.log(userFound);

    if (userFound.confirmEmail) {
      return First(res, "You are already confirmed", 400, http.FAIL);
    }

    const newToken = jwt.sign(
      { id: userFound._id, role: userFound.role, email: userFound.email },
      process.env.JWT_SECRET_KEY
    );

    const html = signUpTemplate(
      `http://localhost:3000/api/auth/activate_account/${newToken}`
    );
    const messageSent = await sendEmail({
      to: userFound.email,
      subject: "Account Activation",
      html,
    });

    if (!messageSent) {
      return First(res, "Failed to send activation email", 400, http.FAIL);
    }

    return Second(
      res,
      ["Your new token", { token: newToken }],
      200,
      http.SUCCESS
    );
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

const displayUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id).select(
      "userName email "
    );
    if (!user) {
      return First(res, "User Not Found", 404, http.FAIL);
    }

    return Second(res, ["user profile", { user }], 200, http.SUCCESS);
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

module.exports = {
  signUp,
  signIn,
  activeAccount,
  Refreshtoken,
  sendAccessCode,
  ResetPassword,
  displayUser,
};
