import * as Sentry from "@sentry/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import NotFoundPage from "./pages/404/NotFoundPage";
import AboutPage from "./pages/info/about/AboutPage";
import ContactPage from "./pages/info/contact/ContactPage";
import ContributePage from "./pages/info/contribute/ContributePage";
import FAQPage from "./pages/info/faq/FAQPage";
import HomePage from "./pages/info/home/HomePage";
import PricingPage from "./pages/info/pricing/PricingPage";
import ProductCategoriesPage from "./pages/product/categories/ProductCategoriesPage";
import ProductDetailPage from "./pages/product/details/ProductDetailPage";
import ProductListingPage from "./pages/product/listing/ProductListingPage";


function App() {
  return (
    <BrowserRouter>
      <Header />

      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="pricing" element={<PricingPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="faq" element={<FAQPage />} />
          <Route path="contribute" element={<ContributePage />} />

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
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>

      <Footer />
    </BrowserRouter>
  );
}

export default Sentry.withProfiler(App);
