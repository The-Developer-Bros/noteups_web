const stripeAPI = require("stripe")(process.env.STRIPE_SECRET_KEY);

async function createCheckoutSession(req, res) {
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
  try {
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
    res.status(400).send({
      message: "Error creating checkout session",
      error,
    });
  }
}

function webhook(req, res) {
  const signature = req.headers["stripe-signature"];

  let event;

  try {
    event = stripeAPI.webhooks.constructEvent(
      req["rawBody"],
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.log(error);
    res.status(400).send(`Webhook Error: ${error.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    console.log(session);
  }
}

module.exports = {
  createCheckoutSession,
  webhook,
};
