import React from "react";
import styled from "styled-components";
import { InnerLayout } from "../styles/Layouts";
import Card from "./Card";
import card from "../img/creditcard.svg";
import active from "../img/active.svg";
import inactive from "../img/inactive.svg";
import check from "../img/check.svg";
import checkDisabled from "../img/check-disabled.svg";

import landingStandard from "../img2/landing-standard.jpg";
import landingPremium from "../img2/landing-premium.jpg";

function PaymentSection() {
  return (
    <PaymentStyled>
      <InnerLayout>
        <h3 className="small-heading">
          An exceptional service, <span>at the right price</span>
        </h3>
        <p className="c-para">
          Start with our free plan and switch to premium as you grow.{" "}
        </p>
        <div className="card-con">
          <Card
            account={"Standard"}
            amount={"INR 499"}
            text={"Get Access to notes from the best authors"}
            button={"Get Started"}
            cardImage={landingStandard}
            active={active}
            inactive={inactive}
            check={check}
            checkDis={checkDisabled}
            checkedText={["Access to the notes", "Multi-user access"]}
            uncheckedText={[
              "Priority 24/7 support",
              "Chat with other peers",
              "Video call with other peers",
              "Exercises and Quizzes",
            ]}
          />

          <Card
            account={"Premium"}
            amount={"INR 999"}
            text={"Get all of the standard features plus premium features"}
            button={"Get Started"}
            cardImage={landingPremium}
            active={active}
            inactive={inactive}
            check={check}
            checkDis={checkDisabled}
            // text1={"10 free local transfers"}

            checkedText={[
              "Access to the notes",
              "Multi-user access",
              "Priority 24/7 support",
              "Chat with other peers",
              "Video call with other peers",
              "Exercises and Quizzes",
            ]}
            uncheckedText={[]}
          />
        </div>
      </InnerLayout>
    </PaymentStyled>
  );
}

const PaymentStyled = styled.section`
  .card-con {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 3rem;
    padding-top: 7.4rem;
    @media screen and (max-width: 689px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }
  .c-para {
    text-align: center;
  }
`;
export default PaymentSection;
