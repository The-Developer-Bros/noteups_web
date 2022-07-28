const mongoose = require("mongoose");

const UserModel = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    // required: true, // because we can have social login
  },

  isUserVerified: {
    type: Boolean,
    default: false,
  },
  verifyToken: {
    type: String,
    default: null,
  },
  googleId: {
    type: String,
  },
  facebookId: {
    type: String,
  },
  githubId: {
    type: String,
  },
  token: {
    // this token is for JWT token
    type: String,
    default: null,
  },
  tokens: {
    // these tokens are for OAuth tokens
    type: Array,
  },
  profile: {
    name: { type: String },
    gender: { type: String },
    location: { type: String },
    website: { type: String },
    picture: { type: String },
  },
  // cart: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Cart",
  // },
  stripeCustomerId: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model("User", UserModel);
