const passport = require("passport");
require("dotenv").config();
const express = require("express");
const { isUserAuthenticated } = require("../middleware/authChecker");
const router = express.Router();

const baseURL = process.env.WEB_APP_URL || "http://localhost:3000";

router.get("/user", isUserAuthenticated, (req, res) => {
  console.log("req.user in oauth", req.user);
  res.send(req.user);
});

//   Google Strategy
router.get(
  "/google",
  passport.authenticate("google", { scope: "profile email" })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${baseURL}/signin`,
  }),
  (req, res) => {
    // res.redirect(req.session.returnTo || "/");
    console.log("req.session.returnTo", req.session.returnTo);
    console.log("req.user", req.user);
    console.log("res.user", res.user);
    res.redirect(baseURL);
  }
);

//   Facebook Strategy
router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email", "public_profile"] })
);
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: `${baseURL}/signin` }),
  (req, res) => {
    // res.redirect(req.session.returnTo || "/");
    console.log("req.session.returnTo", req.session.returnTo);
    res.redirect(baseURL);
  }
);

//   Github Strategy
router.get("/github", passport.authenticate("github"));
router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: `${baseURL}/signin` }),
  (req, res) => {
    // res.redirect(req.session.returnTo || "/");
    console.log("req.session.returnTo", req.session.returnTo);
    res.redirect(baseURL);
  }
);

router.get("/api/current_user", (req, res) => {
  res.send(req.user);
});

router.get("/api/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
