import { motion } from "framer-motion";
import styled from "styled-components";
import "./LandingPage.scss";
import bg from "./img/bg.svg";
import CertificationSection from "./landingcomponents/CertificationSection";
import ChartSection from "./landingcomponents/ChartSection";
import CustomerSupportSection from "./landingcomponents/CustomerSupportSection";
import FAQSection from "./landingcomponents/FAQSection";
import HeaderContent from "./landingcomponents/HeaderContent";
import MessagingSection from "./landingcomponents/MessagingSection";
import PaymentSection from "./landingcomponents/PaymentSection";
import { NewsLetter } from "./newsLetter";
import { OuterLayout } from "./styles/Layouts";

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
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <CertificationSection />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <ChartSection />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <MessagingSection />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <CustomerSupportSection />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <PaymentSection />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <FAQSection />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <NewsLetter />
          </motion.div>
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
