require("dotenv").config();

const express = require("express");
const router = express.Router();

const {
  createCheckoutSession,
  webhook,
} = require("../controllers/payment/StripeController");

app.post("/create-checkout-session", createCheckoutSession);
app.post("/webhook", webhook);

// Export the router
module.exports = router;
