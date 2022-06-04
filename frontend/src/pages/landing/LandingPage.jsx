import CardSection from "./landingcomponents/CardSection";
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
            <CardSection />
          </Fade>
          <Fade right>
            <ChartSection />
          </Fade>
          <Fade left>
            <MessagingSection />
          </Fade>
          <Fade right>
            <PaymentSection />
          </Fade>
          <Fade left>
            <FAQSection />
          </Fade>
          <Fade right>
            <NewsLetter />
          </Fade>
        </MainStyled>
      </OuterLayout>
      <Fade bottom>
        <Footer />
      </Fade>
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
