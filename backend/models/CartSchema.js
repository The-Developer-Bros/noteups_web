import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            quantity: {
                type: Boolean,
                default: false
            }
        }
    ],
    total: {
        type: Number,
        default: 0
    },
});

module.exports = mongoose.model("Cart", CartSchema);