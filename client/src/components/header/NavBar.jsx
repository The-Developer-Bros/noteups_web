import { useAuth0 } from '@auth0/auth0-react';
import { Box } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
// import LoginButton from './LoginButton';
// import LogoutButton from './LogoutButton';
import { LoginButton, LogoutButton, Profile } from './Auth';
import SearchBar from './SearchBar';
import "./NavBar.css";

const NavBar = () => {

    const { isLoading, error } = useAuth0();


    return (
        <nav className="navbar">
            <div className="navbar_container">
                <Link to="/" className="navbar_logo">
                    NOTEUPS
                </Link>

                <SearchBar />

                <ul className="nav_menu">
                    <li className="nav_item">
                        <Link to="/" className="nav_links">
                            Home
                        </Link>
                    </li>
                    <li className="nav_item">
                        <Link to="/about" className="nav_links">
                            About
                        </Link>
                    </li>
                    <li className="nav_item">
                        <Link to="/pricing" className="nav_links">
                            Pricing
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
            </div>
        </nav>
    )
}

export default NavBar;