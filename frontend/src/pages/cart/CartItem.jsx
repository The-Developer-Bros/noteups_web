// import React from "react";
// import { PlusCircleIcon, MinusCircleIcon, TrashIcon } from "../../icons";

// const CartItem = (props) => {
//   const {
//     title,
//     imageUrl,
//     price,
//     quantity,
//     id,
//     description,
//     increase,
//     decrease,
//     removeProduct
//   } = props;
//   const product = { title, imageUrl, price, quantity, id, description };

//   return (
//     <div className="cart-item">
//       <div className="item-image">
//         <img src={imageUrl} alt="product" />
//       </div>
//       <div className="name-price">
//         <h4>{title}</h4>
//         <p>${price}</p>
//       </div>
//       <div className="quantity">
//         <p>{`Quantity: ${quantity}`}</p>
//       </div>
//       <div className="btns-container">
//         <button className="btn-increase" onClick={() => increase(product)}>
//           <PlusCircleIcon width="20px" />
//         </button>
//         {quantity === 1 && (
//           <button className="btn-trash" onClick={() => removeProduct(product)}>
//             <TrashIcon width="20px" />
//           </button>
//         )}
//         {quantity > 1 && (
//           <button className="btn-decrease" onClick={() => decrease(product)}>
//             <MinusCircleIcon width="20px" />
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CartItem;

import { useDispatch } from "react-redux";
import "./CartPage.scss";
import { MinusCircleIcon, PlusCircleIcon, TrashIcon } from "./icons";

const CartItem = (props) => {
  console.log("props are ", props);

  const dispatch = useDispatch();

  return (
    <div className="cart-item">
      <div className="item-image">
        <img src={props.imageUrl} alt="product" />
      </div>
      <div className="name-price">
        <h4>{props.folder}</h4>
        <p>${props.price}</p>
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
