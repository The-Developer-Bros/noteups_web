const passport = require("passport");
const passportJWT = require("passport-jwt");
const { ExtractJwt, Strategy } = passportJWT;
const User = require("../models/UserModel");

// const optionsJwt = {
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey: SECRET,
// };

// export default (passport: PassportStatic) => {
//   passport.use(
//     new Strategy(optionsJwt, async (payload, done) => {
//       await User.findById(payload.uid)
//         .then((user) => {
//           user ? done(null, user) : done(null, false);
//         })
//         .catch(() => done(null, false));
//     })
//   );
// };

// for http only cookie system

// const cookieExtractor = (req) => {
//   let jwt = null;

//   if (req && req.cookies) {
//     jwt = req.cookies?.jwt;
//   }

//   return jwt;
// };
// const optionsCookie = {
//   jwtFromRequest: cookieExtractor,
//   secretOrKey: process.env.JWT_KEY,
// };
// export default (passport) => {
//   passport.use(
//     new passportJwt.Strategy(optionsCookie, async (payload, done) => {
//       await User.findById(payload.uid)
//         .then((user) => {
//           user ? done(null, user) : done(null, false);
//         })
//         .catch(() => done(null, false));
//     })
//   );
// };

passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_KEY,
    },
    async (payload, done) => {
      try {
        const user = await User.findById(payload.uid);
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);
