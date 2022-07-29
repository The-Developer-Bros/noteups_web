import { useDispatch } from "react-redux";
import "./CartPage.scss";
import { MinusCircleIcon, PlusCircleIcon, TrashIcon } from "./icons";

const CartItem = (props) => {
  const dispatch = useDispatch();
  console.log("props", props);

  return (
    <div className="cart-item">
      <div className="item-image">
        <img src={props.imageUrl} alt="product" />
      </div>
      <div className="name-price">
        <h4>{props.subjectDetails.subject_meta_data.subject}</h4>
        <p>{props.subjectDetails.subject_meta_data.price}</p>
      </div>
      <div className="quantity">
        <p>{`Quantity: ${props.quantity}`}</p>
      </div>
      <div className="btns-container">
        <button
          className="btn-increase"
          onClick={() => {
            try {
              dispatch(
                props.increase({
                  subjectDetails: props.subjectDetails,
                  packageType: props.packageType,
                  billingCycle: props.billingCycle,
                  productStripeId: props.productStripeId,
                })
              );
            } catch (error) {
              console.log(error);
            }
          }}
        >
          <PlusCircleIcon width="20px" />
        </button>
        {props.quantity === 1 && (
          <button
            className="btn-trash"
            onClick={() => {
              try {
                dispatch(
                  props.removeProduct({
                    subjectDetails: props.subjectDetails,
                    packageType: props.packageType,
                    billingCycle: props.billingCycle,
                    productStripeId: props.productStripeId,
                  })
                );
              } catch (error) {
                console.log(error);
              }
            }}
          >
            <TrashIcon width="20px" />
          </button>
        )}
        {props.quantity > 1 && (
          <button
            className="btn-decrease"
            onClick={() => {
              try {
                dispatch(
                  props.decrease({
                    subjectDetails: props.subjectDetails,
                    packageType: props.packageType,
                    billingCycle: props.billingCycle,
                    productStripeId: props.productStripeId,
                  })
                );
              } catch (error) {
                console.log(error);
              }
            }}
          >
            <MinusCircleIcon width="20px" />
          </button>
        )}
      </div>
    </div>
  );
};

export default CartItem;
