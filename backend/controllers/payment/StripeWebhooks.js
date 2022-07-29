const stripeAPI = require("stripe")(process.env.STRIPE_SECRET_KEY);

const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");

////////////////////////////////////////// WEBHOOKS //////////////////////////////////////////

async function stripeWebhooks(req, res) {
  const stripeWebhookTransaction = Sentry.startTransaction({
    op: "stripeWebhooks",
    name: "Stripe Webhooks",
    description: "Stripe Webhooks",
  });

  try {
    console.log(req.body);
    const signature = req.headers["stripe-signature"];

    let event = stripeAPI.webhooks.constructEvent(
      // req["rawBody"],
      // req.rawBody,
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    console.log("=================================================");
    console.log("event is", event.type);
    console.log("=================================================");

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        // Handle the event
        console.log("checkout.session.completed");

        // Create Subscription Schedule for the line items

        break;
      case "customer.created":
        // Handle the event
        console.log("customer.created");
        break;
      case "customer.updated":
        // Handle the event
        console.log("customer.updated");
        break;
      case "customer.subscription.created":
        // Handle the event
        console.log("customer.subscription.created");

        // Create Subscription Schedule for the line items
        const schedule = await stripeAPI.subscriptionSchedules.create({
          from_subscription: event.data.object.subscription,
          customer: event.data.object.customer,
          start_date: "now",
          phases: [
            // {
            //   plans: [
            //     {
            //       plan: "",
            //       quantity: 1,
            //     },
            //   ],
            //   duration: "1 month",
            //   prorate: true,
            // },
          ],
        });

        console.log("schedule is", schedule);

        break;
      case "invoice.created":
        // Handle the event
        console.log("invoice.created");
        break;
      case "invoice.finalized":
        // Handle the event
        console.log("invoice.finalized");
        break;
      case "invoice.paid":
        // Handle the event
        console.log("invoice.paid");
        break;
      case "invoice.payment_succeeded":
        // Handle the event
        console.log("invoice.payment_succeeded");
        break;
      case "invoice.upcoming":
        // Handle the event
        console.log("invoice.upcoming");
        break;
      case "payment_method.attached":
        // Handle the event
        console.log("payment_method.attached");
        break;
      case "setup_intent.created":
        // Handle the event
        console.log("setup_intent.created");
        break;
      default:
        // Handle the event
        console.log("default");
        break;
    }

    res.status(200).send({
      message: "Successfully handled webhook",
    });
  } catch (error) {
    console.log(error);
    Sentry.captureException(error);
    res.status(400).send(`Webhook Error: ${error.message}`);
  } finally {
    console.log("Webhook complete");
    stripeWebhookTransaction.finish();
  }
}

module.exports = {
  stripeWebhooks,
};
