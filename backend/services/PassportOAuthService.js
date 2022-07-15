const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

const mongoose = require("mongoose");
// const User = mongoose.model("users");
const User = require("../models/UserModel");

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });
// passport.deserializeUser((id, done) => {
//     // done(null, user);
//     User.findOne({ googleId: String(id) }).then(user => {
//         done(null, user);
//     });
// });

// passport.deserializeUser((id, done) => {
//   // IMPORTANT: This modification is to make sure that mongoose returns the user object
//   // User.findById(mongoose.Types.ObjectId(parseInt(id))).then(user => {
//   //     console.log(user);
//   //     done(null, user);
//   // });

//   User.findOne({ _id: mongoose.Types.ObjectId(Number(id)) }).then((user) => {
//     console.log("found user", user);
//     done(null, user);
//   });
// });

passport.serializeUser((user, done) => {
  console.log("serializeUser", user);
  done(null, user);
});

passport.deserializeUser((user, done) => {
  console.log("deserializeUser", user);
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      passReqToCallback: true,
    },
    (req, accessToken, refreshToken, profile, done) => {
      if (req.user) {
        User.findOne({ googleId: profile.id }, (err, existingUser) => {
          if (err) {
            return done(err);
          }
          if (existingUser) {
            console.log("errors", {
              msg: "There is already a Google account that belongs to you. Sign in with that account or delete it, then link it with your current account.",
            });
            done(err);
          } else {
            User.findById(req.user.id, (err, user) => {
              if (err) {
                return done(err);
              }

              user.googleId = profile.id;
              user.tokens.push({ kind: "google", accessToken });
              user.profile.name = profile._json.name;
              user.profile.gender = profile._json.gender;
              user.profile.picture = profile._json.picture;

              user.name = profile.displayName;
              user.email = profile.emails[0].value;

              user.save((err) => {
                console.log("info", { msg: "Google account has been linked." });
                done(err, user);
              });
            });
          }
        });
      } else {
        User.findOne({ googleId: profile.id }, (err, existingUser) => {
          if (err) {
            return done(err);
          }
          if (existingUser) {
            return done(null, existingUser);
          }
          User.findOne(
            { email: profile.emails[0].value },
            (err, existingEmailUser) => {
              if (err) {
                return done(err);
              }
              if (existingEmailUser) {
                console.log("errors", {
                  msg: "There is already an account using this email address. Sign in to that account and link it with Google manually from Account Settings.",
                });
                done(err);
              } else {
                const user = new User();
                user.name = profile.displayName;
                user.email = profile.emails[0].value;
                user.googleId = profile.id;
                user.tokens.push({ kind: "google", accessToken });
                user.profile.name = profile._json.name;
                user.profile.gender = profile._json.gender;
                user.profile.picture = profile._json.picture;
                user.save((err) => {
                  done(err, user);
                });
              }
            }
          );
        });
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: "/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      //check user table for anyone with a facebook ID of profile.id
      User.findOne(
        {
          "facebook.id": profile.id,
        },
        function (err, user) {
          if (err) {
            return done(err);
          }
          //No user was found... so create a new user with values from Facebook (all the profile. stuff)
          if (!user) {
            user = new User({
              name: profile.displayName,
              email: profile.emails[0].value,
              username: profile.username,
              provider: "facebook",
              //now in the future searching on User.findOne({'facebook.id': profile.id } will match because of this next line
              facebook: profile._json,
            });
            user.save(function (err) {
              if (err) console.log(err);
              return done(err, user);
            });
          } else {
            //found user. Return
            return done(err, user);
          }
        }
      );
    }
  )
);
