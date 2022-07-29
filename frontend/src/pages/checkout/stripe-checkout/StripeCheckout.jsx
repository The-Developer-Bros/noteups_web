import { useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import "../checkout.styles.scss";

import { useSelector } from "react-redux";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { convertToSentenceCase } from "../../../utils";

async function fetchFromAPI(endpoint, opts) {
  const { method, body } = { method: "POST", body: null, ...opts };
  // const user = auth.currentUser;
  // const token = user && (await user.getIdToken());

  const res = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/stripeApi/${endpoint}`,
    {
      method,
      ...(body && { body: JSON.stringify(body) }),
      headers: {
        "Content-Type": "application/json",
        //   Authorization: `Bearer ${token}`,
      },
    }
  );

  if (res.status === 200) {
    toast.success("Payment Requested Successfully");
    return res.json();
  } else {
    toast.error(`Something went wrong`);
    throw new Error(res.statusText);
  }
}

const StripeCheckout = () => {
  const [email, setEmail] = useState("");
  const stripe = useStripe();

  // const itemCount = useSelector((state) => state.cart.itemCount);
  // const total = useSelector((state) => state.cart.total);
  const cartItems = useSelector((state) => state.cart.cartItems);

  console.log("cartItems in checkout", cartItems);

  const handleGuestCheckout = async (e) => {
    e.preventDefault();

    const line_items = cartItems.map((item) => {
      // console.log("item ", item);
      const priceWithCurrency =
        item.subjectDetails.subject_meta_data.price.toString(); // 'INR 500'
      const price = priceWithCurrency.split(" ")[1]; // '500'
      const currency = priceWithCurrency.split(" ")[0]; // 'INR'

      return {
        quantity: 1,

        price_data: {
          product_data: {
            name: convertToSentenceCase(
              item.subjectDetails.subject_meta_data.subject
            ),
            description: item.subjectDetails.subject_meta_data.description,
            // images: [item.imageUrl],
          },

          currency: currency,
          unit_amount: parseInt(price) * 100,

          recurring: {
            interval: item.billingCycle === "monthly" ? "month" : "year",
            interval_count: 1,
          },
        },
      };

      // item.productStripeId has the product stripe id

      // return {
      //   quantity: item.quantity,
      //   price: item.productStripeId,

      //   // price_data: {
      //   //   recurring: {
      //   //     interval: item.billingCycle === "monthly" ? "month" : "year",
      //   //     interval_count: item.quantity,
      //   //   },
      //   //   currency: "inr",
      //   //   product: "item.productId",
      //   //   unit_amount: 100,
      //   // },
      // };
    });

    console.log("line_items in checkout", line_items);

    const response = await fetchFromAPI("create-subscription-session", {
      body: { line_items: line_items, customer_email: email },
    });

    const { sessionId } = response;
    const { error } = await stripe.redirectToCheckout({
      sessionId,
    });

    if (error) {
      console.log(error);
      toast.error(error.message);
    } else {
      console.log("success");
      toast.success("Payment Requested Successfully");
    }
  };

  return (
    <form onSubmit={handleGuestCheckout}>
      <div>
        <ToastContainer />
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          value={email}
          className="nomad-input"
        />
      </div>
      <div className="submit-btn">
        <button type="submit" className="button is-black nomad-btn submit">
          Checkout
        </button>
      </div>
    </form>
  );
};

export default StripeCheckout;
