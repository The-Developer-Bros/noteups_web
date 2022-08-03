const passport = require("passport");
require("dotenv").config();
const express = require("express");
const { isUserAuthenticated } = require("../middleware/authChecker");
const router = express.Router();

const baseURL = process.env.WEB_APP_URL || "http://localhost:3000";

router.get("/user", isUserAuthenticated, (req, res) => {
  res.status(200).json(req.user);
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

router.post("/api/logout", (req, res) => {
  try {
    req.logout();
    req.user = null;
    // res.clearCookie("session", { domain: "localhost", path: "/" });
    // res.clearCookie("session.sig", { domain: "localhost", path: "/" });
    // res.clearCookie("connect.sid", { domain: "localhost", path: "/" });
    // res.clearCookie("connect.sid.sig", { domain: "localhost", path: "/" });

    cookies = req.cookies;
    for (let cookie in cookies) {
      console.log("cookie", cookie);
      res.clearCookie(cookie, { domain: "localhost", path: "/" });
    }
    // req.session = null; // clearing session for cookie-session
    req.session.destroy(); // clearing session for express-session

    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
