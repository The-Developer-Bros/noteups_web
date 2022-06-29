import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Total = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="total-container">
      <div className="total">
        <p>Total Items: {props.itemCount}</p>
        <p>{`Total: ₹${props.total}`}</p>
      </div>
      <div className="checkout">
        <button
          className="button is-black"
          onClick={() => {
            navigate("/checkout");
          }}
        >
          CHECKOUT
        </button>
        <button
          className="button is-white"
          onClick={() => dispatch(props.clearCart())}
        >
          CLEAR
        </button>
      </div>
    </div>
  );
};

export default Total;
