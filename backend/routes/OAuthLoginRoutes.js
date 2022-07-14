const passport = require("passport");
require("dotenv").config();
const express = require("express");
const router = express.Router();

//   Facebook Strategy
router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email", "public_profile"] })
);
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: process.env.WEB_APP_URL || "http://localhost:3000" }),
  (req, res) => {
    res.redirect(req.session.returnTo || "/");
  }
);

//   Github Strategy
router.get("/github", passport.authenticate("github"));
router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: process.env.WEB_APP_URL || "http://localhost:3000" }),
  (req, res) => {
    res.redirect(req.session.returnTo || "/");
  }
);

//   Google Strategy
router.get(
  "/google",
  passport.authenticate("google", { scope: "profile email" })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: process.env.WEB_APP_URL || "http://localhost:3000" }),
  (req, res) => {
    // res.redirect(req.session.returnTo || "/");
    res.redirect("/");
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
