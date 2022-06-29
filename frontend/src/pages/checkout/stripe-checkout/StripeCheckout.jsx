import { useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";

import { useSelector } from "react-redux";

async function fetchFromAPI(endpoint, opts) {
  const { method, body } = { method: "POST", body: null, ...opts };
  // const user = auth.currentUser;
  // const token = user && (await user.getIdToken());
  console.log(
    "process.env.REACT_APP_BACKEND_URL ",
    process.env.REACT_APP_BACKEND_URL
  );
  const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/paymentApi/${endpoint}`, {
    method,
    ...(body && { body: JSON.stringify(body) }),
    headers: {
      "Content-Type": "application/json",
      //   Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 200) {
    return res.json();
  } else {
    throw new Error(res.statusText);
  }
}

const StripeCheckout = () => {
  const [email, setEmail] = useState("");
  const stripe = useStripe();

  const itemCount = useSelector((state) => state.cart.itemCount);
  const total = useSelector((state) => state.cart.total);
  const cartItems = useSelector((state) => state.cart.cartItems);


  const handleGuestCheckout = async (e) => {
    e.preventDefault();
    const line_items = cartItems.map((item) => {
      console.log("item ", item);
      const priceWithCurrency = item.subject_meta_data.price.toString(); // 'INR 500'
      const price = priceWithCurrency.split(" ")[1]; // '500'
      const currency = priceWithCurrency.split(" ")[0]; // 'INR'

      return {
        quantity: item.quantity,
        price_data: {
          currency: currency,
          unit_amount: parseInt(price) * 100,
          product_data: {
            name: item.subject_meta_data.name,
            description: item.subject_meta_data.description,
            // images: [item.imageUrl],
          },
        },
      };
    });

    const response = await fetchFromAPI("create-checkout-session", {
      body: { line_items, customer_email: email },
    });

    const { sessionId } = response;
    const { error } = await stripe.redirectToCheckout({
      sessionId,
    });

    if (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleGuestCheckout}>
      <div>
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
