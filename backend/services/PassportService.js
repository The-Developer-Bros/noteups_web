const keys = require("../config/keys");

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

const mongoose = require("mongoose");
const User = mongoose.model("users");

// passport.serializeUser((user, done) => {
//     done(null, user.id);
// });
// passport.deserializeUser((id, done) => {
//     // done(null, user);
//     User.findOne({ googleId: String(id) }).then(user => {
//         done(null, user);
//     });
// });

// passport.deserializeUser((id, done) => {
//     // IMPORTANT: This modification is to make sure that mongoose returns the user object
//     // User.findById(mongoose.Types.ObjectId(parseInt(id))).then(user => {
//     //     console.log(user);
//     //     done(null, user);
//     // });

//     User.findOne({_id : mongoose.Types.ObjectId(Number(id))}).then(user => {
//         done(null, user);
//     });
// });

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(
        "==========================================================="
      );
      console.log("accessToken: ", accessToken);
      console.log("refreshToken: ", refreshToken);
      console.log("profile: ", profile);
      console.log("done: ", done);
      console.log(
        "==========================================================="
      );

      User.findOne({ googleId: profile.id }).then((user) => {
        if (user) {
          console.log("user found");
          done(null, user);
        } else {
          console.log("user not found");
          new User({
            username: profile.displayName,
            googleId: profile.id,
            picture: profile.photos[0].value,
            email: profile.emails[0].value,
          })
            .save()
            .then((user) => {
              console.log("user saved");
              done(null, user);
            });
        }
      });
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: config.facebook.clientID,
      clientSecret: config.facebook.clientSecret,
      callbackURL: config.facebook.callbackURL,
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
