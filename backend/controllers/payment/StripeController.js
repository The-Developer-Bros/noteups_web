const stripeAPI = require("stripe")(process.env.STRIPE_SECRET_KEY);

const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");

async function createCheckoutSession(req, res) {
  const createCheckoutSessionTransaction = Sentry.startTransaction({
    op: "createCheckoutSession",
    name: "Create Checkout Session",
  });

  try {
    const domainUrl = process.env.WEB_APP_URL || "http://localhost:3000";
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
      payment_method_types: ["card"],
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

function webhook(req, res) {
  const webhookTransaction = Sentry.startTransaction({
    op: "webhook",
    name: "Webhook",
  });

  try {
    const signature = req.headers["stripe-signature"];

    let event;

    event = stripeAPI.webhooks.constructEvent(
      req["rawBody"],
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.log(error);
    Sentry.captureException(error);
    res.status(400).send(`Webhook Error: ${error.message}`);
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      console.log(`Session ${session.id} completed`);
    } else if (event.type === "checkout.session.canceled") {
      console.log("Checkout Session Canceled");
    } else if (event.type === "checkout.session.payment_failed") {
      console.log("Checkout Session Payment Failed");
    } else {
      console.log("Unknown Webhook Event Type");
    }
  } catch (error) {
    console.log(error);
    Sentry.captureException(error);
    res.status(400).send(`Webhook Error: ${error.message}`);
  }

  webhookTransaction.finish();
  res.status(200).send("Success");
}

module.exports = {
  createCheckoutSession,
  webhook,
};
