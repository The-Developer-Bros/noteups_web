import * as Sentry from "@sentry/react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import NavBar from "./components/header/NavBar";
import BottomBar from "./components/footer/BottomBar";
import NotFoundPage from "./pages/404/NotFoundPage";
import ChangePassword from "./pages/auth2/changepassword/ChangePassword";
import EmailVerified from "./pages/auth2/emailverified/EmailVerified";
import ForgotPassword from "./pages/auth2/forgotpassword/ForgotPassword";
import SendEmail from "./pages/auth2/sendemail/SendEmail";
import Signin from "./pages/auth2/signin/Signin";
import Signup from "./pages/auth2/signup/Signup";
import AboutPage from "./pages/info/about/AboutPage";
import ContactPage from "./pages/info/contact/ContactPage";
import ContributePage from "./pages/info/contribute/ContributePage";
import FAQPage from "./pages/info/faq/FAQPage";
import PricingPage from "./pages/info/pricing/PricingPage";
import Footer from "./pages/landing/landingcomponents/Footer";
import LandingPage from "./pages/landing/LandingPage";
import ProductCategoriesPage from "./pages/product/categories/ProductCategoriesPage";
import ProductDetailPage from "./pages/product/details/ProductDetailPage";
import ProductListingPage from "./pages/product/listing/ProductListingPage";

function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <NavBar />

      <div className="App">
        <Routes>
          {/* Info Routes */}
          <Route path="about" element={<AboutPage />} />
          <Route path="pricing" element={<PricingPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="faq" element={<FAQPage />} />
          <Route path="contribute" element={<ContributePage />} />

          {/* Product Routes */}
          <Route path="products" element={<ProductCategoriesPage />} />
          <Route path="products/:domain" element={<ProductListingPage />} />
          <Route
            path="products/:domain/:subdomain"
            element={<ProductListingPage />}
          />
          <Route
            path="products/:domain/:subdomain/:subject"
            element={<ProductDetailPage />}
          />

          {/* Auth Routes */}
          {/* <Route
            path="/"
            element={token ? <LandingPage /> : <Navigate to="/signin" />}
          /> */}
          <Route path="/" element={<LandingPage />} />

          <Route path="/send-verify-mail" element={<SendEmail />} />
          <Route path="/email-verify/:token" element={<EmailVerified />} />

          <Route
            path="/signin"
            element={!token ? <Signin /> : <Navigate to="/" />}
          />

          <Route
            path="/signup"
            element={!token ? <Signup /> : <Navigate to="/" />}
          />

          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/forgot-password-verify/:token"
            element={<ChangePassword />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>

      <Footer />
      {/* <BottomBar /> */}
    </BrowserRouter>
  );
}

export default Sentry.withProfiler(App);
