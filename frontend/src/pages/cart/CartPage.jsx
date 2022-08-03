import React from "react";
import { useSelector } from "react-redux";
import {
  addProduct, clearCart, decrease, increase, isInCart, removeProduct
} from "../../redux/slices/CartSlice";
import CartItem from "./CartItem";
import "./CartPage.scss";
import Total from "./Total";

//   export default CartPage;

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const itemCount = useSelector((state) => state.cart.itemCount);
  const total = useSelector((state) => state.cart.total);

  return (
    <div className="cart-page">
      <div className="cart-item-container">
        <h1>Cart</h1>
        {cartItems.length === 0 ? (
          <div className="empty-cart">Your Cart is empty</div>
        ) : (
          <>
            <div className="cart-page">
              <div className="cart-item-container">
                {cartItems.map((cartItem) => (
                  <CartItem
                    key={cartItem.subjectDetails.public_id}
                    subjectDetails={cartItem.subjectDetails}
                    quantity={cartItem.quantity}
                    packageType={cartItem.packageType}
                    billingCycle={cartItem.billingCycle}
                    productStripeId={cartItem.productStripeId}
                    addProduct={addProduct}
                    increase={increase}
                    decrease={decrease}
                    removeProduct={removeProduct}
                    clearCart={clearCart}
                    isInCart={isInCart}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <div className="cart-total">
        <Total itemCount={itemCount} total={total} clearCart={clearCart} />
      </div>
    </div>
  );
};

export default CartPage;
