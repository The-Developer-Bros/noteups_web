import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../../redux/slices/CartSlice";
import "../checkout.styles.scss";

const Success = ({ history }) => {
  // const { clearCart, cartItems } = useContext(CartContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  useEffect(() => {
    if (cartItems.length !== 0) {
      dispatch(clearCart());
    }
  }, [cartItems, dispatch]);

  return (
    <div className="checkout">
      <h1>Thank you for your order</h1>
      <p>
        We are currently processing your order and will send you a confirmation
        email shortly
      </p>
      <div>
        <button
          className="button is-black nomad-btn submit"
          onClick={() => navigate("/products")}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default Success;
