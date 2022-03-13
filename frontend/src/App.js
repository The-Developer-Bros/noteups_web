import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import AboutPage from './pages/AboutPage/AboutPage';
import HomePage from './pages/HomePage/HomePage';
// import LoginPage from './pages/LoginPage/LoginPage';
// import SignupPage from './pages/SignupPage/SignupPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
// import ContactPage from './pages/ContactPage/ContactPage';
import PricingPage from './pages/PricingPage/PricingPage';
import ProductCategoriesPage from './pages/ProductCategoriesPage/ProductCategoriesPage';
import ProductSinglePage from './pages/ProductSinglePage/ProductSinglePage';


function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        {/* <Route path="/contact" element={<ContactPage />} /> */}
        <Route path="/categories" element={<ProductCategoriesPage />} />
        <Route path="/product/:id" element={<ProductSinglePage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Footer />
    </BrowserRouter>

  );
}

export default App;
