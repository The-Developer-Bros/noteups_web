import CardSection from "./landingcomponents/CertificationSection";
import Header from "./landingcomponents/Header";
import { OuterLayout } from "./styles/Layouts";
import styled from "styled-components";
import ChartSection from "./landingcomponents/ChartSection";
import MessagingSection from "./landingcomponents/MessagingSection";
import PaymentSection from "./landingcomponents/PaymentSection";
import FAQSection from "./landingcomponents/FAQSection";
import Footer from "./landingcomponents/Footer";
import { Fade } from "react-reveal";
import "./LandingPage.scss";
import bg from "./img/bg.svg";
import HeaderContent from "./landingcomponents/HeaderContent";
import { NewsLetter } from "./newsLetter";
import CertificationSection from "./landingcomponents/CertificationSection";
import CustomerSupportSection from "./landingcomponents/CustomerSupportSection";

function LandingPage() {
  return (
    <div className="LandingPage">
      <HeaderStyled>
        <div className="header-content">
          <HeaderContent />
        </div>
      </HeaderStyled>

      <OuterLayout>
        <MainStyled>
          <Fade left>
            <CertificationSection />
          </Fade>
          <Fade right>
            <ChartSection />
          </Fade>
          <Fade left>
            <MessagingSection />
          </Fade>
          <Fade right>
            <CustomerSupportSection />
          </Fade>
          <Fade left>
            <PaymentSection />
          </Fade>
          <Fade right>
            <FAQSection />
          </Fade>
          <Fade left>
            <NewsLetter />
          </Fade>
        </MainStyled>
      </OuterLayout>
    </div>
  );
}

const HeaderStyled = styled.header`
  min-height: 100vh;
  /* margin-top: 5rem; */
  width: 100%;
  background-image: url(${bg});
  background-repeat: no-repeat;
  background-size: cover;
  background-position-y: 100%;
  .header-content {
    padding: 0 18rem;
    @media screen and (max-width: 1347px) {
      padding: 5rem 14rem;
    }
    @media screen and (max-width: 1186px) {
      padding: 5rem 8rem;
    }
    @media screen and (max-width: 990px) {
      padding: 5rem 4rem;
    }
  }
`;

const MainStyled = styled.main``;

export default LandingPage;
