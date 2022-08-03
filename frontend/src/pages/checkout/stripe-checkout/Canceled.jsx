import { useNavigate } from "react-router-dom";
import "../checkout.styles.scss";

const Canceled = () => {
  const navigate = useNavigate();

  return (
    <div className="checkout">
      <h1>Checkout Cancelled</h1>
      <p>If you want to continue shopping, please click the button below.</p>
      <div>
        <button
          className="button is-black nomad-btn submit"
          onClick={() => navigate("/cart")}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default Canceled;
