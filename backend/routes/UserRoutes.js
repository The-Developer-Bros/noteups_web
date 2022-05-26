const express = require("express");
const router = express.Router();
// import {
//   sendForgotPasswordMail,
//   sendVerificationMail,
//   signinUser,
//   signupUser,
//   verifyForgotMail,
//   verifyUserMail,
// } from "../controllers/userControllers";
// import {
//   sendForgotPasswordMailValidation,
//   sendVerificationMailValidation,
//   signinUserValidation,
//   signupUserValidation,
//   verifyForgotMailValidation,
//   verifyUserMailValidation,
// } from "../validation/userValidation/userValidation";

const {
  sendForgotPasswordMail,
  sendVerificationMail,
  signinUser,
  signupUser,
  verifyForgotMail,
  verifyUserMail,
} = require("../controllers/UserControllers");

const {
  sendForgotPasswordMailValidation,
  sendVerificationMailValidation,
  signinUserValidation,
  signupUserValidation,
  verifyForgotMailValidation,
  verifyUserMailValidation,
} = require("../validation/userValidation/userValidation");

router.post("/signup", signupUserValidation, signupUser);
router.post("/signin", signinUserValidation, signinUser);

router.post(
  "/send-verification-mail",
  sendVerificationMailValidation,
  sendVerificationMail
);

router.post("/verify-user-mail", verifyUserMailValidation, verifyUserMail);

router.post(
  "/forgot-password",
  sendForgotPasswordMailValidation,
  sendForgotPasswordMail
);

router.post(
  "/verify-forgot-mail",
  verifyForgotMailValidation,
  verifyForgotMail
);

module.exports = router;