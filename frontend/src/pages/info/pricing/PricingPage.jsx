import React, { useState } from "react";
import "./PricingPage.scss";

const PricingPage = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  const toggleSubscription = () => {
    setIsAnnual(!isAnnual);
  };

  return (
    <div className="content">
      <div className="header">
        <h1 className="text-center my-5">Pricing</h1>
        <p className="motto">Affordable prices for everyone</p>
      </div>
      <div className="toggle-container" onClick={toggleSubscription}>
        <p className="toggle-label">{isAnnual ? "Annual" : "Monthly"}</p>
        <div className={`slider ${isAnnual ? "" : "monthly"}`}></div>
      </div>
      <div className="d-flex justify-content-center">
        <div className="card pricing-card engineering-card">
          <div className="card-header">Engineering Bundle</div>
          <div className="card-body">
            <ul>
              <li>Feature 1: Lorem ipsum dolor sit amet.</li>
              <li>Feature 2: Consectetur adipiscing elit.</li>
              <li>Feature 3: Sed do eiusmod tempor incididunt.</li>
              <li>Feature 4: Ut labore et dolore magna aliqua.</li>
            </ul>
            <div className="price-add-to-cart">
              <p>{isAnnual ? "$100/year" : "$10/month"}</p>
              <button className="btn btn-primary add-to-cart-btn">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        <div className="card pricing-card arts-card">
          <div className="card-header">Arts Bundle</div>
          <div className="card-body">
            <ul>
              <li>Feature 1: Lorem ipsum dolor sit amet.</li>
              <li>Feature 2: Consectetur adipiscing elit.</li>
              <li>Feature 3: Sed do eiusmod tempor incididunt.</li>
              <li>Feature 4: Ut labore et dolore magna aliqua.</li>
            </ul>
            <div className="price-add-to-cart">
              <p>{isAnnual ? "$120/year" : "$12/month"}</p>
              <button className="btn btn-primary add-to-cart-btn">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        <div className="card pricing-card commerce-card">
          <div className="card-header">Commerce Bundle</div>
          <div className="card-body">
            <ul>
              <li>Feature 1: Lorem ipsum dolor sit amet.</li>
              <li>Feature 2: Consectetur adipiscing elit.</li>
              <li>Feature 3: Sed do eiusmod tempor incididunt.</li>
              <li>Feature 4: Ut labore et dolore magna aliqua.</li>
            </ul>
            <div className="price-add-to-cart">
              <p>{isAnnual ? "$150/year" : "$15/month"}</p>
              <button className="btn btn-primary add-to-cart-btn">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
