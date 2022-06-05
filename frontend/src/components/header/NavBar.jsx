import { useAuth0 } from "@auth0/auth0-react";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import { Auth0LoginButton, Auth0LogoutButton, Auth0Profile } from "./Auth";
// import SearchBar from './SearchBar';
import { defaultState } from "../../redux/slices/AuthSlice";
import { Button } from "@chakra-ui/button";

import "./NavBar.scss";

const NavBar = () => {
  // const { isLoading, error } = useAuth0();

  // Navbar Visibility
  const [click, setClick] = useState(false);
  const handleClick = () => {
    setClick(!click);
  };
  const [navVisibility, setNavVisibility] = useState(false);

  const changeBackground = () => {
    if (window.location.pathname === "/") {
      if (window.scrollY >= 700) {
        setNavVisibility(true);
      } else {
        setNavVisibility(false);
      }
    } else {
      setNavVisibility(true);
    }
  };

  window.addEventListener("scroll", changeBackground);

  // Sign in/out
  const { name, token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signout = () => {
    localStorage.removeItem("token");
    // localStorage.removeItem("auth");
    localStorage.removeItem("persist:root"); 
    dispatch(defaultState());
    navigate("/", { replace: true });
    window.location.reload();
  };

  return (
    <Box className={navVisibility ? "navbar_active" : "navbar"}>
      <nav className="navbar_container">
        <Link to="/" className="navbar_logo">
          NOTEUPS
        </Link>

        <div className="nav_menu_container">
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
                <i className="fa fa-shopping-cart" aria-hidden="true"></i>
              </Link>
            </li>
          </ul>
        </div>

        {/* Login/Register Button for Chakra*/}
        <div className="login_box nav_item">
          {token && name ? (
            <div className="login_container">
              <div className="login_text">
                <p>{name}</p>
              </div>
              <div className="login_button">
                <Button onClick={signout}>Signout</Button>
              </div>
            </div>
          ) : (
            <div className="login_container">
              <div className="login_button">
                <Button
                  onClick={() => {
                    navigate("/signin");
                  }}
                >
                  Login
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Login/Register Button for Auth0*/}
        {/* <div className="login_box nav_item">
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
        </div> */}

        <div className="hamburger" onClick={handleClick}>
          {click ? (
            <FaTimes className="hamburger_bars" size={20} />
          ) : (
            <FaBars className="hamburger_bars" size={20} />
          )}
        </div>
      </nav>
    </Box>
  );
};

export default NavBar;
