import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    googleId: {
        type: String
    },
    facebookId: {
        type: String
    },
    githubId: {
        type: String
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart",
        required: true
    },
});

module.exports = mongoose.model("User", UserSchema);
