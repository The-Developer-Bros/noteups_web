import { useAuth0 } from '@auth0/auth0-react';
import { Box } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
// import LoginButton from './LoginButton';
// import LogoutButton from './LogoutButton';
import { LoginButton, LogoutButton, Profile } from './Auth';
import { FaTimes, FaBars } from 'react-icons/fa'
import { useState } from 'react';
import SearchBar from './SearchBar';
import "./NavBar.css";

const NavBar = () => {

    const { isLoading, error } = useAuth0();

    const [click, setClick] = useState(false);
    const handleClick = () => {
        setClick(!click);
    }

    return (
        <Box className="navbar">
            <div className="navbar_container">
                <Link to="/" className="navbar_logo" >
                    NOTEUPS
                </Link>

                <SearchBar />

                <ul className={click ? "nav_menu active" : "nav_menu"}>


                    <li className="nav_item">
                        <Link to="/categories" className="nav_links">
                            <i className="fas fa-list" /> Categories
                        </Link>
                    </li>

                    <li className="nav_item">
                        <Link to="/pricing" className="nav_links">
                            <i className="fas fa-dollar-sign" /> Pricing
                        </Link>
                    </li>

                    <li className="nav_item">
                        <Link to="/earn" className="nav_links">
                            <i className="fas fa-coins" /> Earn
                        </Link>
                    </li>

                    <li className="nav_item">
                        <Link to="/contact" className="nav_links">
                            <i className="fas fa-phone" /> Contact
                        </Link>
                    </li>


                    <li className="nav_item">
                        <main>
                            {isLoading ? <p>Loading...</p> : error ? <p>{error.message}</p> :
                                <div>

                                    <LoginButton />
                                    <Box className="login_box">
                                        <Profile />
                                        <LogoutButton />
                                    </Box>
                                </div>
                            }
                        </main>
                    </li>

                </ul>

                <div
                    className="hamburger"
                    onClick={handleClick}
                >
                    {click ?
                        <FaTimes
                            style={{ color: '#fff' }}
                            size={20} /> :
                        <FaBars
                            style={{ color: '#fff' }}
                            size={20}
                        />}

                </div>
            </div>
        </Box >
    )
}

export default NavBar;