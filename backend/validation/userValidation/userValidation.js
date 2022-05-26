const validator = require("../utils/validator");
const { userSchema } = require("./userSchema");

const signupUserValidation = (req, res, next) =>
  validator(userSchema.signupUser, req.body, next);
const signinUserValidation = (req, res, next) =>
  validator(userSchema.signinUser, req.body, next);

const sendVerificationMailValidation = (req, res, next) =>
  validator(userSchema.sendVerificationMail, req.body, next);
const verifyUserMailValidation = (req, res, next) =>
  validator(userSchema.verifyUserMail, req.body, next);

const sendForgotPasswordMailValidation = (req, res, next) =>
  validator(userSchema.sendForgotPasswordMail, req.body, next);
const verifyForgotMailValidation = (req, res, next) =>
  validator(userSchema.verifyForgotMail, req.body, next);

module.exports = {
  signupUserValidation,
  signinUserValidation,
  sendVerificationMailValidation,
  verifyUserMailValidation,
  sendForgotPasswordMailValidation,
  verifyForgotMailValidation,
};
