import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { defaultState } from "../../redux/slices/AuthSlice";

import "./NavBar.scss";

const NavBar = () => {
  // const { isLoading, error } = useAuth0();

  // Navbar Visibility
  const [click, setClick] = useState(false);
  const handleClick = () => {
    setClick(!click);
  };
  const [navVisibility, setNavVisibility] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const changeBackground = () => {
      if (location.pathname === "/") {
        if (window.scrollY >= 700) {
          setNavVisibility(true);
        } else {
          setNavVisibility(false);
        }
      } else {
        setNavVisibility(true);
      }
    };
    changeBackground();
    window.addEventListener("scroll", changeBackground);
  }, [location]);

  // Sign in/out
  const user = useSelector((state) => state.auth);
  console.log("user in navbar", user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignout = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/auth/api/logout`,
        { method: "POST", credentials: "same-origin" }
      ).then((res) => res.toString());
      console.log("respose fron logout POST", res.toString());

      dispatch(defaultState());
    } catch (err) {
      console.log(err);
      dispatch(defaultState());
      navigate("/signin");
    }
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
          {user.name ? (
            <>
              <div className="login_container">
                <div className="logged_in_user">
                  <h2>{user.name}</h2>
                </div>
                <div className="signout_button">
                  <button onClick={(e) => handleSignout(e)}>Sign Out</button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="login_container">
                <button
                  className="signin_button"
                  onClick={() => {
                    navigate("/signin");
                  }}
                >
                  Sign In
                </button>
                <button
                  className="signup_button"
                  onClick={() => {
                    navigate("/signup");
                  }}
                >
                  Sign Up
                </button>
              </div>
            </>
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
