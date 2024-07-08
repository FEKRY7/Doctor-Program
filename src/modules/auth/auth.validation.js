const joi = require("joi");

const SignUp = joi
  .object({
    userName: joi.string().required().min(2).max(20).messages({
      "any.required": "userName is required",
      "string.base": "userName should be a type of 'text'",
      "string.empty": "userName cannot be an empty field",
      "string.min": "userName should have a minimum length of {#limit}",
      "string.max": "userName should have a maximum length of {#limit}",
    }),
    email: joi.string().required().email().messages({
      "any.required": "Email is required",
      "string.email": "Email must be a valid email",
    }),
    age: joi.string(),
    gender: joi.string(),
    phone: joi.string(),
    password: joi
      .string()
      .required()
      .pattern(
        new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
      )
      .messages({
        "any.required": "Password is required",
        "string.pattern.base":
          "Password must contain at least one uppercase letter, one lowercase letter, and one digit, and be at least 8 characters long",
      }),
    cpassword: joi.string().valid(joi.ref("password")).required().messages({
      "any.only": "Confirm password must match password",
      "any.required": "Confirm password is required",
    }),
  })
  .required();

const activateAcountSchema = joi
  .object({
    token: joi.string().required().messages({
      "any.required": "Token is required",
    }),
  })
  .required();

const SignIn = joi
  .object({
    email: joi.string().required().email().messages({
      "any.required": "Email is required",
      "string.email": "Email must be a valid email",
    }),
    password: joi
      .string()
      .required()
      .pattern(
        new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
      )
      .messages({
        "any.required": "Password is required",
        "string.pattern.base":
          "Password must contain at least one uppercase letter, one lowercase letter, and one digit, and be at least 8 characters long",
      }),
  })
  .required();

const Reset = joi
  .object({
    email: joi.string().required().email().messages({
      "any.required": "Email is required",
      "string.email": "Email must be a valid email",
    }),
    password: joi
      .string()
      .required()
      .pattern(
        new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
      )
      .messages({
        "any.required": "Password is required",
        "string.pattern.base":
          "Password must contain at least one uppercase letter, one lowercase letter, and one digit, and be at least 8 characters long",
      }),
    cpassword: joi.string().valid(joi.ref("password")).required().messages({
      "any.only": "Confirm password must match password",
      "any.required": "Confirm password is required",
    }),
    accesscode:joi.number().required()
  })
  .required();

module.exports = {
  SignUp,
  activateAcountSchema,
  SignIn,
  Reset
};
