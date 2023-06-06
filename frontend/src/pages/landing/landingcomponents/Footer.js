import React from "react";
import styled from "styled-components";
import { InnerLayout } from "../styles/Layouts";
import logo from "../img/logo.svg";
import appleStore from "../img3/apple-store.svg";
import googlePlay from "../img3/google-play.svg";

function Footer() {
  return (
    <FooterStyled>
      <InnerLayout>
        <div className="footer-con">
          <div className="logo-con">
            <img src={logo} alt="" />
            <div className="logo-items">
              <p>
                Copyright @2021 LoremIpsum. <br />
                All rights reserved.
              </p>
            </div>
          </div>
          <ul className="botton-nav">
            <div className="links1">
              <li>
                <a href="/team">Team</a>
              </li>
              <li>
                <a href="/press">Press</a>
              </li>
              <li>
                <a href="/fees">Fees</a>
              </li>
            </div>
            <div className="links2">
              <li>
                <a href="/services">Services</a>
              </li>
              <li>
                <a href="/projects">Projects</a>
              </li>
              <li>
                <a href="/affiliate">Affiliate</a>
              </li>
            </div>
            <div className="links3">
              <li>
                <a href="/terms">Terms of use</a>
              </li>
              <li>
                <a href="/privacy">Privacy Policy</a>
              </li>
              <li>
                <a href="/contact">Contact us</a>
              </li>
            </div>
          </ul>

          {/* Add office address */}
          <address>
            Kings & Queens Studio Rooms, Spice Garden, Marathahalli, Bengaluru,
            Karnataka - 560037, India
          </address>

          {/* Add icons for downloading from Apple and Android stores */}
          <div className="download-icons">
            <img src={appleStore} alt="Download on the Apple Store" />
            <img src={googlePlay} alt="Get it on Google Play" />
          </div>
        </div>
      </InnerLayout>
    </FooterStyled>
  );
}

const FooterStyled = styled.footer`
  padding: 2rem 18rem;
  background-color: #dce2f0;
  background-image: linear-gradient(
    to right,
    #e0b0ff,
    #ff69b4,
    #9370db,
    #4b0082
  );
  color: white;

  @media screen and (max-width: 1347px) {
    padding: 2rem 14rem;
  }
  @media screen and (max-width: 1186px) {
    padding: 2rem 8rem;
  }
  @media screen and (max-width: 990px) {
    padding: 2rem 4rem;
  }

  .footer-con {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 2rem;
    align-items: center;
    justify-content: center;

    .logo-con {
      display: flex;
      align-items: center;

      img {
        width: 90px;
        margin-right: 0.5rem;
      }
    }

    .botton-nav {
      display: flex;
      justify-content: space-between;

      li {
        padding: 0.5rem 0.5rem;
        color: white;

        a {
          color: white;
          font-size: 1.2rem;
        }
      }
    }

    address {
      font-style: normal;
      text-align: center;
      margin-top: 1rem;
      font-size: 1.2rem;
    }

    .download-icons {
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 100px;
        margin: 0.5rem;
      }
    }
  }
`;

export default Footer;
