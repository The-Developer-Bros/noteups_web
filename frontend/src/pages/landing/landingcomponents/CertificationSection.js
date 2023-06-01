import React from "react";
import styled from "styled-components";
import { InnerLayout } from "../styles/Layouts";
// import certification from "../img/creditcard.svg";

import landingCertificate from "../img2/landing-certification-transparent.png";

function CertificationSection() {
  return (
    <CertificationSectionStyled>
      <InnerLayout>
        <div className="certification-container">
          <div className="certification-left">
            <h2 className="secondary-heading">
              Get the best certification from our company
            </h2>
            <p>
              We provide you with exercise certificates for your training. After
              you have completed the exercises, you can get your certificate.
              These certificates can be used at job interviews.
            </p>
          </div>
          <div className="certification-right">
            <img
              src={landingCertificate}
              alt=""
              className="certification-img"
            />
          </div>
        </div>
      </InnerLayout>
    </CertificationSectionStyled>
  );
}

const CertificationSectionStyled = styled.section`
  .certification-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-row-gap: 2rem;
    @media screen and (max-width: 1200px) {
      grid-template-columns: repeat(1, 1fr);
    }
    .certification-right {
      display: flex;
      justify-content: flex-end;
      img {
        filter: drop-shadow(0px 50px 100px rgba(22, 25, 79, 0.15));
      }
    }

    .certification-left {
      p {
        padding: 1rem 0;
      }
    }

    .certification-img {
      width: 80%;
      height: auto;
    }
  }
`;

export default CertificationSection;
