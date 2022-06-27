require("dotenv").config();

const express = require("express");
const router = express.Router();

const {
  createCheckoutSession,
  webhook,
} = require("../controllers/payment/StripeController");


router.post("/create-checkout-session", createCheckoutSession);
router.post("/webhook", webhook);

// Export the router
module.exports = router;
