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
        <nav className="navbar">
            <div className="navbar_container">
                <Link to="/" className="navbar_logo" >
                    NOTEUPS
                </Link>

                <SearchBar />

                <ul className={click ? "nav_menu active" : "nav_menu"}>

                    {/* Create hamburger Menu */}
                    <li className="nav_item">
                        <Link to="/" className="nav_links">
                            <i className="fas fa-home" /> Home
                        </Link>
                    </li>

                    <li className="nav_item">
                        <Link to="/notes" className="nav_links">
                            <i className="fas fa-book" /> Notes
                        </Link>
                    </li>

                    <li className="nav_item">
                        <Link to="/about" className="nav_links">
                            <i className="fas fa-info-circle" /> About
                        </Link>
                    </li>

                    <li className="nav_item">
                        <Link to="/contact" className="nav_links">
                            <i className="fas fa-envelope" /> Contact
                        </Link>
                    </li>


                    <li className="nav_item">
                        <main>
                            {isLoading ? <p>Loading...</p> : error ? <p>{error.message}</p> :
                                <div>

                                    <LoginButton />
                                    <Box className="login_options">
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
        </nav >
    )
}

export default NavBar;