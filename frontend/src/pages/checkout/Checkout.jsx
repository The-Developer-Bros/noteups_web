import { useState } from "react";
import { useSelector } from "react-redux";
import "./checkout.styles.scss";
import StripeCheckout from "./stripe-checkout/StripeCheckout";

const Checkout = () => {
  // const { itemCount, total, cartItems } = useContext(CartContext);
  const itemCount = useSelector((state) => state.cart.itemCount);
  const total = useSelector((state) => state.cart.total);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const [shipping, setShipping] = useState(null);
  
  const addressShown = {
    display: shipping ? "none" : "block",
  };
  
  const cardShown = {
    display: shipping ? "block" : "none",
  };
  
  return (
    <div className="checkout">
      <h2>Checkout Summary</h2>
      <h3>{`Total Items: ${itemCount}`}</h3>
      <h4>{`Amount to Pay: $${total}`}</h4>
      <StripeCheckout />
      {/* <div style={addressShown}>
          <ShippingAddress setShipping={setShipping} />
        </div>
        <div style={cardShown}>
          <CustomCheckout {...{ shipping, cartItems }} />
        </div> */}
    </div>
  );
};

export default Checkout;
