const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;

const mongoose = require("mongoose");
const { User } = require("../models/UserModel");

const stripeService = require("../services/payments/StripeService");

const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");

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
          const existingUser = await User.findOne({ googleId: profile.id });

          if (existingUser) {
            console.log("errors", {
              msg: "There is already a Google account that belongs to you. Sign in with that account or delete it, then link it with your current account.",
            });
            done(null, existingUser);
          } else {
            const user = await User.findById(req.user.id);

            if (!user) {
              return done(null, false);
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
              if (err) {
                console.log("error", err);
                return done(err);
              }

              console.log("info", {
                msg: "Google account has been linked.",
                user: user,
                customer: customer,
              });
              done(null, user);
            });
          }
        } else {
          const existingUser = await User.findOne({ googleId: profile.id });

          if (existingUser) {
            done(null, existingUser);
          } else {
            const existingEmailUser = await User.findOne({
              email: profile.emails[0].value,
            });

            if (existingEmailUser) {
              // Update existingEmailUser with Google ID and other information
              existingEmailUser.googleId = profile.id;
              existingEmailUser.tokens.push({ kind: "google", accessToken });
              existingEmailUser.profile.name = profile._json.name;
              existingEmailUser.profile.gender = profile._json.gender;
              existingEmailUser.profile.picture = profile._json.picture;

              // Save changes to existingEmailUser
              await existingEmailUser.save();

              // Log in with existingEmailUser
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
                if (err) {
                  console.log("error", err);
                  return done(err);
                }

                console.log("info", {
                  msg: "Google account has been linked.",
                  user: user,
                  customer: customer,
                });
                done(null, user);
              });
            }
          }
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

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/callback",
      profileFields: ["id", "emails", "name"],
    },
    async (accessToken, refreshToken, profile, done) => {
      const passportFacebookStrategyAuthenticationTransaction =
        Sentry.startTransaction({
          op: "passport.facebook.strategy.authentication",
          description: "Facebook authentication",
          name: "passport.facebook.strategy.authentication",
        });

      try {
        if (profile._json.email) {
          User.findOne(
            { email: profile._json.email },
            async (err, existingEmailUser) => {
              if (err) {
                return done(err);
              }
              if (existingEmailUser) {
                // Update existingEmailUser with Facebook ID and other information
                existingEmailUser.facebookId = profile.id;
                existingEmailUser.tokens.push({
                  kind: "facebook",
                  accessToken,
                });
                existingEmailUser.profile.name = `${profile.name.givenName} ${profile.name.familyName}`;
                existingEmailUser.profile.picture = `https://graph.facebook.com/${profile.id}/picture?type=large`;

                // Save changes to existingEmailUser
                await existingEmailUser.save();

                // Log in with existingEmailUser
                done(null, existingEmailUser);
              } else {
                const user = new User();
                user.email = profile._json.email;
                user.name = `${profile.name.givenName} ${profile.name.familyName}`;
                user.facebookId = profile.id;
                user.tokens.push({ kind: "facebook", accessToken });
                user.profile.name = user.name;
                user.profile.picture = `https://graph.facebook.com/${profile.id}/picture?type=large`;

                // Create Stripe Customer
                const customer = await stripeService.addNewCustomer(
                  user.profile.name,
                  user.email
                );
                user.stripeCustomerId = customer.id;

                user.save((err) => {
                  if (err) {
                    return done(err);
                  }
                  console.log("info", {
                    msg: "Facebook account has been linked.",
                    user: user,
                    customer: customer,
                  });
                  done(null, user);
                });
              }
            }
          );
        } else {
          console.log("errors", {
            msg: "Facebook account doesn't have an email associated with it.",
            profile: profile,
          });
          // done(null, false, { message: "Facebook account doesn't have an email associated with it." });
          done(null, false);
        }
      } catch (error) {
        console.log(error);
        Sentry.captureException(error);
        done(error);
      } finally {
        passportFacebookStrategyAuthenticationTransaction.finish();
      }
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
      scope: "user:email",
    },
    async (accessToken, refreshToken, profile, done) => {
      const passportGitHubStrategyAuthenticationTransaction =
        Sentry.startTransaction({
          op: "passport.github.strategy.authentication",
          description: "GitHub authentication",
          name: "passport.github.strategy.authentication",
        });

      try {
        if (profile.emails && profile.emails.length) {
          User.findOne(
            { email: profile.emails[0].value },
            async (err, existingEmailUser) => {
              if (err) {
                return done(err);
              }
              if (existingEmailUser) {
                // Update existingEmailUser with GitHub ID and other information
                existingEmailUser.githubId = profile.id;
                existingEmailUser.tokens.push({ kind: "github", accessToken });
                existingEmailUser.profile.name = profile.displayName;
                existingEmailUser.profile.picture = profile._json.avatar_url;

                // Save changes to existingEmailUser
                await existingEmailUser.save();

                // Log in with existingEmailUser
                done(null, existingEmailUser);
              } else {
                const user = new User();
                user.email = profile.emails[0].value;
                user.githubId = profile.id;
                user.tokens.push({ kind: "github", accessToken });
                user.profile.name = profile.displayName;
                user.profile.picture = profile._json.avatar_url;

                // Create Stripe Customer
                const customer = await stripeService.addNewCustomer(
                  user.profile.name,
                  user.email
                );
                user.stripeCustomerId = customer.id;

                user.save((err) => {
                  console.log("info", {
                    msg: "GitHub account has been linked.",
                    user: user,
                    customer: customer,
                  });
                  done(err, user);
                });
              }
            }
          );
        } else {
          return done("GitHub account email not verified.");
        }
      } catch (error) {
        console.log(error);
        Sentry.captureException(error);
        done(error);
      } finally {
        passportGitHubStrategyAuthenticationTransaction.finish();
      }
    }
  )
);
