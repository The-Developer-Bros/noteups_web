// import bcrypt from "bcryptjs";
// import createHttpError, { InternalServerError } from "http-errors";
// import jwt from "jsonwebtoken";
// import nodemailer from "nodemailer";
// import User from "../models/User";

const bcrypt = require("bcryptjs");
const createHttpError = require("http-errors");
const InternalServerError = require("http-errors").InternalServerError;
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { User } = require("../models/UserModel");

const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");

let testAccount = null;
let transporter = null;

const createTransportTransactions = Sentry.startTransaction({
  name: "createTransport",
  operation: "createTransport",
});

async function createTransport() {
  testAccount = await nodemailer.createTestAccount();
  // await is needed to make sure that the test account is created before we use it

  transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });
}

createTransport()
  .catch((err) => {
    console.log("error creating transport", err);
    Sentry.captureException(err);
  })
  .finally(() => {
    createTransportTransactions.finish();
  });

const signupUser = async (req, res, next) => {
  const signupUserTransactions = Sentry.startTransaction({
    op: "signupUser",
    name: "Sign up user",
    description: "Signing up the user",
  });

  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return next(createHttpError(422, "Email Already Exist!"));

    const hashedPassword = await bcrypt.hash(password, 8);
    const user = new User({ name, email, password: hashedPassword });

    await user.save();

    res.json({ message: "User Created" });
  } catch (error) {
    console.error(error);
    Sentry.captureException(error);
    signupUserTransactions.setStatus("failed");
    signupUserTransactions.finish();
    return next(createHttpError(500, "Internal Server Error"));
  } finally {
    signupUserTransactions.finish();
  }
};

const signinUser = async (req, res, next) => {
  const signinUserTransactions = Sentry.startTransaction({
    op: "signinUser",
    name: "Sign in user",
    description: "Signing in the user",
  });

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return next(createHttpError(404, "User not Found!"));

    // If password doesn't exist then generate a new one
    // This situation happens when the user is created by OAuth provider
    if (!user.password) {
      const hashedPassword = await bcrypt.hash(password, 8);
      user.password = hashedPassword;
      await user.save();
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      return next(createHttpError(401, "Not Valid Password!"));

    if (!user.isUserVerified)
      return next(createHttpError(406, "User not verified"));

    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
        userId: user.id,
      },
      process.env.JWT_KEY,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("jwt", token);

    res.json({ name: user.name, token });
  } catch (error) {
    console.log(error);
    Sentry.captureException(error);
    signinUserTransactions.setStatus("failed");
    signinUserTransactions.finish();
    return next(createHttpError(500, "Internal Server Error"));
  } finally {
    signinUserTransactions.finish();
  }
};

const sendVerificationMail = async (req, res, next) => {
  const sendVerificationMailTransactions = Sentry.startTransaction({
    op: "sendVerificationMail",
    name: "Send Verification Mail",
    description: "Sending the verification mail",
  });

  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return next(createHttpError(404, "Email Not Valid!"));

    if (user.isUserVerified)
      return next(createHttpError(406, "User already verified"));

    const encryptedToken = await bcrypt.hash(user._id.toString(), 8);

    const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_KEY, {
      expiresIn: "60m",
    });

    let info = await transporter.sendMail({
      from: '"Noteups Customer Care" <customer.care@noteups.com>', // sender address
      to: `${email}`, // list of receivers
      subject: "For Your Noteups Account Verification", // Subject line
      html: `Your Verification Link <a href="${process.env.FRONTEND_URL}/email-verify/${jwtToken}">Link</a>`, // html body
      text: `Your Verification Link ${process.env.FRONTEND_URL}/email-verify/${jwtToken}`, // plain text body
    });

    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    await user.updateOne({ $set: { verifyToken: encryptedToken } });
    res.json({
      message: `Preview URL: %s ${nodemailer.getTestMessageUrl(info)}`,
    });

    // Close the transporter
    transporter.close();
  } catch (error) {
    console.log(error);
    Sentry.captureException(error);
    sendVerificationMailTransactions.setStatus("failed");
    sendVerificationMailTransactions.finish();
    return next(createHttpError(500, "Internal Server Error"));
  } finally {
    sendVerificationMailTransactions.finish();
  }
};

const verifyUserMail = async (req, res, next) => {
  const verifyUserMailTransactions = Sentry.startTransaction({
    op: "verifyUserMail",
    name: "Verify User Mail",
    description: "Verifying the user mail",
  });

  try {
    const { token } = req.body;
    const decodedToken = jwt.verify(token, process.env.process.env.JWT_KEY);

    const user = await User.findById(decodedToken.userId);
    if (!user) return next(createHttpError(401, "User not found!"));

    await user.updateOne({
      $set: { isUserVerified: true },
      $unset: { verifyToken: 0 },
    });

    res.json({ message: "Email Verified!" });
  } catch (error) {
    console.log(error);
    Sentry.captureException(error);
    verifyUserMailTransactions.setStatus("failed");
    verifyUserMailTransactions.finish();
    return next(createHttpError(500, "Internal Server Error"));
  } finally {
    verifyUserMailTransactions.finish();
  }
};

const sendForgotPasswordMail = async (req, res, next) => {
  const sendForgotPasswordMailTransactions = Sentry.startTransaction({
    op: "sendForgotPasswordMail",
    name: "Send Forgot Password Mail",
    description: "Sending the forgot password mail",
  });

  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return next(createHttpError(404, "Email Not Valid!"));

    const encryptedToken = await bcrypt.hash(user._id.toString(), 8);

    const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_KEY, {
      expiresIn: "60m",
    });

    let info = await transporter.sendMail({
      from: '"Noteups Customer Care" <customer.care@noteups.com>', // sender address
      to: `${email}`, // list of receivers
      subject: "For Forgot Password Verification Mail", // Subject line
      html: `Your Verification for forgot password Link <a href="${process.env.WEB_APP_URL}/forgot-password-verify/${jwtToken}">Link</a>`, // html body
      text: `Your Verification for forgot password Link ${process.env.WEB_APP_URL}/forgot-password-verify/${jwtToken}`, // plain text body
    });

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    await user.updateOne({ $set: { verifyToken: encryptedToken } });
    res.status(200).json({
      message: `Preview URL: %s ${nodemailer.getTestMessageUrl(info)}`,
    });
  } catch (error) {
    console.log(error);
    Sentry.captureException(error);
    sendForgotPasswordMailTransactions.setStatus("failed");
    sendForgotPasswordMailTransactions.finish();
    return next(createHttpError(500, "Internal Server Error"));
  } finally {
    sendForgotPasswordMailTransactions.finish();
  }
};
const verifyForgotMail = async (req, res, next) => {
  const verifyForgotMailTransactions = Sentry.startTransaction({
    op: "verifyForgotMail",
    name: "Verify Forgot Mail",
    description: "Verifying the forgot password mail",
  });

  try {
    const { token, password } = req.body;
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);

    const user = await User.findById(decodedToken.userId);
    if (!user) return next(createHttpError(401, "User not found"));

    const encryptedPassword = await bcrypt.hash(password, 8);

    await user.updateOne({
      $set: { password: encryptedPassword },
      $unset: { verifyToken: 0 },
    });

    res.status(200).json({ message: "Password Changed!" });
  } catch (error) {
    console.log(error);
    Sentry.captureException(error);
    verifyForgotMailTransactions.setStatus("failed");
    verifyForgotMailTransactions.finish();
    return next(createHttpError(500, "Internal Server Error"));
  } finally {
    verifyForgotMailTransactions.finish();
  }
};

module.exports = {
  signupUser,
  signinUser,
  sendVerificationMail,
  verifyUserMail,
  sendForgotPasswordMail,
  verifyForgotMail,
};
