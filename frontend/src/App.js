import * as Sentry from "@sentry/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import NotFoundPage from "./pages/404/NotFoundPage";
import ChangePassword from "./pages/auth2/changepassword/ChangePassword";
import EmailVerified from "./pages/auth2/emailverified/EmailVerified";
import ForgotPassword from "./pages/auth2/forgotpassword/ForgotPassword";
import SendEmail from "./pages/auth2/sendemail/SendEmail";
import Signin from "./pages/auth2/signin/Signin";
import Signup from "./pages/auth2/signup/Signup";
import CartPage from "./pages/cart/CartPage";
import Checkout from "./pages/checkout/Checkout";
import Canceled from "./pages/checkout/stripe-checkout/Canceled";
import Success from "./pages/checkout/stripe-checkout/Success";
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
import { defaultState, setUser } from "./redux/slices/AuthSlice";

function App() {
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // const fetchAuthentication = async () => {
  //   const response = await backendClient.get(`/auth/user, {withCredentials: true}`).catch((err) => {
  //     console.log("Not properly authenticated");
  //     dispatch(defaultState());
  //     // navigate("/signin/error");
  //   });
  //   console.log("response is ", response);

  //   if (response && response.data) {
  //     console.log("User: ", response.data);
  //     dispatch(setUser(response.data));
  //     // navigate("/products");
  //   }
  // };

  useEffect(() => {
    const fetchAuthentication = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/auth/user`,
          { credentials: "include" }
        ).then((res) => res.json());
        console.log("response is ", response);

        if (response) {
          console.log("User: ", response);
          dispatch(setUser(response));
          // navigate("/products");
        }
      } catch (err) {
        console.log("Not properly authenticated from App");
        dispatch(defaultState());
        // navigate("/signin");
      }
    };
    fetchAuthentication();
    console.log("user in app", user);
  }, []); // do not include any dependencies here, otherwise it will run every time the component is rendered

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

          {/* Cart Routes */}
          <Route path="cart" element={<CartPage />} />

          {/* Checkout Routes */}
          <Route path="checkout" element={<Checkout />} />
          <Route path="success" element={<Success />} />
          <Route path="canceled" element={<Canceled />} />

          <Route path="/" element={<LandingPage />} />
          {/* Auth Routes */}

          <Route path="/send-verify-mail" element={<SendEmail />} />
          <Route path="/email-verify/:token" element={<EmailVerified />} />

          <Route
            path="/signin"
            element={user.name ? <Navigate to="/" /> : <Signin />}
          />

          <Route
            path="/signup"
            element={user.name ? <Navigate to="/" /> : <Signup />}
          />

          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/forgot-password-verify/:token"
            element={<ChangePassword />}
          />

          {/* Protected routes for dashboard and account */}
          <Route
            path="/dashboard"
            element={
              user.name ? <Navigate to="/" /> : <Navigate to="/signin" />
            }
            // element={user.name  ? <Dashboard /> : <Navigate to="/signin" />}
          />
          <Route
            path="/account"
            element={
              user.name ? <Navigate to="/" /> : <Navigate to="/signin" />
            }
            // element={user.name  ? <Account /> : <Navigate to="/signin" />}
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
