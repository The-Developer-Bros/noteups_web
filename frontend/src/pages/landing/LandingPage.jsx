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

function LandingPage() {
  return (
    <div className="LandingPage">
      <Header />
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
        </MainStyled>
      </OuterLayout>
      <Fade bottom>
        <Footer />
      </Fade>
    </div>
  );
}

const MainStyled = styled.main``;

export default LandingPage;
