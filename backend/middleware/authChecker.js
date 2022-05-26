const passport = require("passport");
const authChecker = passport.authenticate("jwt", { session: false });

module.exports = authChecker;