import React from "react";
import "./CheckoutButton.scss";

const CheckoutButton = ({ id, imgSrc, onClick, text }) => {
  return (
    <button className="checkout-button" onClick={onClick} id={id}>
      <div className="grey-circle">
        <div className="purple-circle">
          {imgSrc ? <img src={imgSrc} alt="checkout-button" /> : null}
        </div>
      </div>
      <div className="text-container">{text}</div>
    </button>
  );
};

export default CheckoutButton;
