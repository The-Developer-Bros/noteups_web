import { useDispatch } from "react-redux";
import "./CartPage.scss";
import { MinusCircleIcon, PlusCircleIcon, TrashIcon } from "./icons";

const CartItem = (props) => {

  const dispatch = useDispatch();

  return (
    <div className="cart-item">
      <div className="item-image">
        <img src={props.imageUrl} alt="product" />
      </div>
      <div className="name-price">
        <h4>{props.subject_meta_data.subject}</h4>
        <p>{props.subject_meta_data.price}</p>
      </div>
      <div className="quantity">
        <p>{`Quantity: ${props.quantity}`}</p>
      </div>
      <div className="btns-container">
        <button
          className="btn-increase"
          onClick={() => dispatch(props.increase(props))}
        >
          <PlusCircleIcon width="20px" />
        </button>
        {props.quantity === 1 && (
          <button
            className="btn-trash"
            onClick={() => dispatch(props.removeProduct(props))}
          >
            <TrashIcon width="20px" />
          </button>
        )}
        {props.quantity > 1 && (
          <button
            className="btn-decrease"
            onClick={() => dispatch(props.decrease(props))}
          >
            <MinusCircleIcon width="20px" />
          </button>
        )}
      </div>
    </div>
  );
};

export default CartItem;
