require("dotenv").config();

const express = require("express");
const router = express.Router();

const {
  createCheckoutSession,
  createSubscriptionSession,
  retrievePricesList,
} = require("../../controllers/payment/StripeController");

const { stripeWebhooks } = require("../../controllers/payment/StripeWebhooks");

router.get("/prices", retrievePricesList);
router.post("/create-checkout-session", createCheckoutSession);
router.post("/create-subscription-session", createSubscriptionSession);
router.post("/webhook", stripeWebhooks);

// Export the router
module.exports = router;
