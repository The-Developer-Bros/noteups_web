const stripeAPI = require("stripe")(process.env.STRIPE_SECRET_KEY);

const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");

// Retreive Prices List
async function retrievePricesList(req, res) {
  const retrievePricesListTransaction = Sentry.startTransaction({
    op: "retrievePricesList",
    name: "Retrieve Prices List",
  });

  try {
    const prices = await stripeAPI.prices.list();

    res.status(200).send({
      prices,
      message: "Successfully retrieved prices list",
    });
  } catch (error) {
    console.log(error);
    Sentry.captureException(error);
    res.status(400).send({
      message: "Error retrieving prices list",
      error,
    });
  } finally {
    retrievePricesListTransaction.finish();
  }
}

async function createCheckoutSession(req, res) {
  const createCheckoutSessionTransaction = Sentry.startTransaction({
    op: "createCheckoutSession",
    name: "Create Checkout Session",
  });

  try {
    const domainUrl = process.env.WEB_APP_URL;
    const { line_items, customer_email } = req.body;

    // check req body has line items and email
    if (!line_items || !customer_email) {
      return res.status(400).send({
        message:
          "Missing line items or customer email(Required Session Parameters)",
      });
    }

    let session;

    session = await stripeAPI.checkout.sessions.create({
      payment_method_types: ["card", "pm_card_visa", "pm_card_mastercard"],
      line_items,
      mode: "payment",
      success_url: `${domainUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domainUrl}/canceled`,
      customer_email,
      shipping_address_collection: {
        //   India , USA, europe , australia
        allowed_countries: ["IN", "US", "FR", "AU"],
      },
    });

    res.status(200).send({
      sessionId: session.id,
      message: "Successfully created checkout session",
    });
  } catch (error) {
    console.log(error);
    Sentry.captureException(error);
    res.status(400).send({
      message: "Error creating checkout session",
      error,
    });
  } finally {
    createCheckoutSessionTransaction.finish();
  }
}

async function createSubscriptionSession(req, res) {
  const createSubscriptionSessionTransaction = Sentry.startTransaction({
    op: "createSubscriptionSession",
    name: "Create Subscription Session",
  });

  try {
    const domainUrl = process.env.WEB_APP_URL || "http://localhost:3000";
    const { line_items, customer_email } = req.body;

    // check req body has line items and email
    if (!customer_email || !line_items) {
      return res.status(400).send({
        message:
          "Missing line items or customer email(Required Session Parameters)",
      });
    }

    let session;

    // create subscription session for new subjects
    // update subscription session for existing subjects

    session = await stripeAPI.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: line_items,
      mode: "subscription",
      success_url: `${domainUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domainUrl}/canceled`,
      customer_email,
      // trial
      // subscription_data: {
      //   trial_period_days: 7,
      // },
    });

    res.status(200).send({
      sessionId: session.id,
      message: "Successfully created subscription session",
    });
  } catch (error) {
    console.log(error);
    Sentry.captureException(error);
    res.status(400).send({
      message: "Error creating subscription",
      error,
    });
  } finally {
    createSubscriptionSessionTransaction.finish();
  }
}

module.exports = {
  createCheckoutSession,
  createSubscriptionSession,
  retrievePricesList,
};
