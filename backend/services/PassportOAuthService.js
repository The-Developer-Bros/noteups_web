const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

const mongoose = require("mongoose");
// const User = mongoose.model("users");
const { User } = require("../models/UserModel");

const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");

const stripeService = require("../services/payments/StripeService");

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
  // console.log("serializeUser", user);
  done(null, user);
});

passport.deserializeUser((user, done) => {
  // console.log("deserializeUser", user);
  done(null, user);
});

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "/auth/google/callback",
//       passReqToCallback: true,
//     },
//     (req, accessToken, refreshToken, profile, done) => {
//       try {
//         if (req.user) {
//           User.findOne({ googleId: profile.id }, (err, existingUser) => {
//             if (err) {
//               console.log("error finding user", err);
//               return done(err);
//             }
//             if (existingUser) {
//               console.log("existing user", existingUser);
//               done(null, existingUser);
//             } else {
//               console.log("new user", profile);
//               const user = new User();
//               user.googleId = profile.id;
//               user.tokens.push({ kind: "google", accessToken });
//               user.profile.name = profile._json.name;
//               user.profile.gender = profile._json.gender;
//               user.profile.picture = profile._json.picture;

//               user.name = profile.displayName;
//               user.email = profile.emails[0].value;

//               user.save((err) => {
//                 if (err) {
//                   console.log("error saving user", err);
//                   done(err);
//                 } else {
//                   console.log("saved user", user);
//                   done(null, user);
//                 }
//               });
//             }
//           });
//         } else {
//           User.findOne({ googleId: profile.id }, (err, existingUser) => {
//             if (err) {
//               console.log("error finding user", err);
//               done(err);
//             } else if (existingUser) {
//               console.log("existing user", existingUser);
//               done(null, existingUser);
//             } else {
//               User.findOne(
//                 { email: profile.emails[0].value },
//                 (err, existingEmailUser) => {
//                   if (err) {
//                     console.log("error finding user", err);
//                     done(err);
//                   } else if (existingEmailUser) {
//                     console.log("existing email user", existingEmailUser);
//                     done(null, existingEmailUser);
//                   } else {
//                     console.log("new user", profile);
//                     const user = new User();

//                     user.googleId = profile.id;
//                     user.tokens.push({ kind: "google", accessToken });
//                     user.profile.name = profile._json.name;
//                     user.profile.gender = profile._json.gender;
//                     user.profile.picture = profile._json.picture;

//                     user.name = profile.displayName;
//                     user.email = profile.emails[0].value;

//                     user.save((err) => {
//                       if (err) {
//                         console.log("error saving user", err);
//                         done(err);
//                       } else {
//                         console.log(
//                           "Google account has been linked to your account",
//                           user
//                         );
//                         done(null, user);
//                       }
//                     });
//                   }
//                 }
//               );
//             }
//           });
//         }
//       } catch (err) {
//         console.log("error", err);
//         done(err);
//       }
//     }
//   )
// );

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      const passportGoogleStrategyAuthenticationTransaction =
        Sentry.startTransaction({
          op: "passport.google.strategy.authentication",
          description: "Google authentication",
          name: "passport.google.strategy.authentication",
        });

      try {
        if (req.user) {
          User.findOne({ googleId: profile.id }, (err, existingUser) => {
            if (err) {
              return done(err);
            }
            if (existingUser) {
              console.log("errors", {
                msg: "There is already a Google account that belongs to you. Sign in with that account or delete it, then link it with your current account.",
              });
              // done(err);
              done(null, existingUser);
            } else {
              User.findById(req.user.id, async (err, user) => {
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

                // Create Stripe Customer
                const customer = await stripeService.addNewCustomer(
                  user.profile.name,
                  user.email
                );
                user.stripeCustomerId = customer.id;

                user.save((err) => {
                  console.log("info", {
                    msg: "Google account has been linked.",
                    user: user,
                    customer: customer,
                  });
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
              async (err, existingEmailUser) => {
                if (err) {
                  return done(err);
                }
                if (existingEmailUser) {
                  console.log("errors", {
                    msg: "There is already an account using this email address. Sign in to that account and link it with Google manually from Account Settings.",
                    existingEmailUser: existingEmailUser,
                  });
                  // done(err);
                  done(null, existingEmailUser);
                } else {
                  const user = new User();
                  user.name = profile.displayName;
                  user.email = profile.emails[0].value;
                  user.googleId = profile.id;
                  user.tokens.push({ kind: "google", accessToken });
                  user.profile.name = profile._json.name;
                  user.profile.gender = profile._json.gender;
                  user.profile.picture = profile._json.picture;

                  // Create Stripe Customer
                  const customer = await stripeService.addNewCustomer(
                    user.profile.name,
                    user.email
                  );
                  user.stripeCustomerId = customer.id;

                  user.save((err) => {
                    console.log("info", {
                      msg: "Google account has been linked.",
                      user: user,
                      customer: customer,
                    });
                    done(err, user);
                  });
                }
              }
            );
          });
        }
      } catch (error) {
        console.log(error);
        Sentry.captureException(error);
        done(error);
      } finally {
        passportGoogleStrategyAuthenticationTransaction.finish();
      }
    }
  )
);
