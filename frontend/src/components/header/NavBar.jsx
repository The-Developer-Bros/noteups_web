import { useAuth0 } from "@auth0/auth0-react";
import Box from "@mui/material/Box";
import React from "react";
import { Link } from "react-router-dom";
import { Auth0LoginButton, Auth0LogoutButton, Auth0Profile } from "./Auth";
import { FaTimes, FaBars, FaCart } from "react-icons/fa";
import { useState } from "react";
// import SearchBar from './SearchBar';
import "./NavBar.scss";

const NavBar = () => {
  const { isLoading, error } = useAuth0();

  const [click, setClick] = useState(false);
  const handleClick = () => {
    setClick(!click);
  };

  return (
    <Box className="navbar">
      <nav className="navbar_container">
        <Link to="/" className="navbar_logo">
          NOTEUPS
        </Link>

        <div className="navbar_menu">
          <ul className={click ? "nav_menu active" : "nav_menu"}>
            <li className="nav_item">
              <Link to="/products" className="nav_links">
                <i className="fas fa-list" /> Products
              </Link>
            </li>

            <li className="nav_item">
              <Link to="/pricing" className="nav_links">
                <i className="fas fa-dollar-sign" /> Pricing
              </Link>
            </li>

            <li className="nav_item">
              <Link to="/contribute" className="nav_links">
                <i className="fas fa-coins" /> Contribute
              </Link>
            </li>

            <li className="nav_item">
              <Link to="/contact" className="nav_links">
                <i className="fas fa-phone" /> Contact
              </Link>
            </li>

            <li className="nav_item">
              <Link to="/cart" className="nav_links">
                <i class="fa fa-shopping-cart" aria-hidden="true"></i>
              </Link>
            </li>
          </ul>
        </div>

        {/* Login/Register Button */}
        <div className="login_box nav_item">
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error.message}</p>
          ) : (
            <div>
              <Auth0LoginButton />
              <Box className="login_box">
                <Auth0Profile />
                <Auth0LogoutButton />
              </Box>
            </div>
          )}
        </div>

        <div className="hamburger" onClick={handleClick}>
          {click ? (
            <FaTimes style={{ color: "#fff" }} size={20} />
          ) : (
            <FaBars style={{ color: "#fff" }} size={20} />
          )}
        </div>
      </nav>
    </Box>
  );
};

export default NavBar;
