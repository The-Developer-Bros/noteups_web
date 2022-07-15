const passport = require("passport");
const authChecker = passport.authenticate("jwt", { session: false });

const isUserAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({
      message: "You are not logged in!",
    });
  }
};

module.exports = {
  authChecker,
  isUserAuthenticated,
};
