import React from "react";
import styled from "styled-components";
import { InnerLayout } from "../styles/Layouts";
// import customer-support from "../img/creditcard.svg";

import landingCustomerSupport from "../img2/landing-customer-support-transparent.png";

function CustomerSupportSection() {
  return (
    <CustomerSupportSectionStyled>
      <InnerLayout>
        <div className="customer-support-container">
          <div className="customer-support-left">
            <img
              src={landingCustomerSupport}
              alt=""
              className="customer-support-img"
            />
          </div>
          <div className="customer-support-right">
            <h2 className="secondary-heading">
              The best customer support for resolving your issues
            </h2>
            <p>
              Our customer support team is here to help you with any questions
              you may have.They are available 24/7 and are always ready to help
              you with any questions you have.
            </p>
          </div>
        </div>
      </InnerLayout>
    </CustomerSupportSectionStyled>
  );
}

const CustomerSupportSectionStyled = styled.section`
  .customer-support-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 10rem;
    @media screen and (max-width: 1200px) {
      grid-template-columns: repeat(1, 1fr);
    }
    .customer-support-left {
      display: flex;
      justify-content: flex-end;
      img {
        filter: drop-shadow(0px 50px 100px rgba(22, 25, 79, 0.15));
      }
    }

    .customer-support-right {
      p {
        padding: 1rem 0;
      }
    }

    .customer-support-img {
      width: 80%;
      height: auto;
    }
  }
`;

export default CustomerSupportSection;
