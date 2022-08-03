const passport = require("passport");
const authChecker = passport.authenticate("jwt", { session: false });

const isUserAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log("user is authenticated");
    next();
  } else {
    console.log("User is NOT authenticated");
    res.status(401).json({
      message: "You are not logged in!",
    });
  }
};

module.exports = {
  authChecker,
  isUserAuthenticated,
};
