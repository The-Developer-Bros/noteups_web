const stripeAPI = require("stripe")(process.env.STRIPE_SECRET_KEY);

const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");

const addNewCustomer = async (name, email) => {
  const addNewCustomerTransaction = Sentry.startTransaction({
    op: "addNewCustomer",
    name: "Add New Customer",
  });

  try {
    const customer = await stripeAPI.customers.create({
      name: name,
      email: email,
      description: `${name} - ${email} created account on ${new Date()}`,
    });

    return customer;
  } catch (error) {
    console.log(error);
    Sentry.captureException(error);
    throw error;
  } finally {
    addNewCustomerTransaction.finish();
  }
};

const getCustomerByID = async (customerId) => {
  const getCustomerByIDTransaction = Sentry.startTransaction({
    op: "getCustomerByID",
    name: "Get Customer By ID",
  });

  try {
    const customer = await stripeAPI.customers.retrieve(customerId);

    return customer;
  } catch (error) {
    console.log(error);
    Sentry.captureException(error);
    throw error;
  } finally {
    getCustomerByIDTransaction.finish();
  }
};

// const retrievePricesList = async () => {
//   const retrievePricesListTransaction = Sentry.startTransaction({
//     op: "retrievePricesList",
//     name: "Retrieve Prices List",
//   });

//   try {
//     const prices = await stripeAPI.prices.list();

//     return prices;
//   } catch (error) {
//     console.log(error);
//     Sentry.captureException(error);
//     throw error;
//   } finally {
//     retrievePricesListTransaction.finish();
//   }
// };

module.exports = {
  addNewCustomer,
  getCustomerByID,
  // retrievePricesList,
};
