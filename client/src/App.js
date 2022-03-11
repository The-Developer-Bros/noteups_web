import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import AboutPage from './pages/AboutPage';
import HomePage from './pages/HomePage';
// import LoginPage from './pages/LoginPage';
// import SignupPage from './pages/SignupPage';
import NotFoundPage from './pages/NotFoundPage';
// import ContactPage from './pages/ContactPage';
import PricingPage from './pages/PricingPage';
import ProductCategoriesPage from './pages/ProductCategoriesPage';
import ProductSinglePage from './pages/ProductSinglePage';


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
