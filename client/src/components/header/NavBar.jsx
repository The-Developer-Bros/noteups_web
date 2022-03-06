import { useAuth0 } from '@auth0/auth0-react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Link } from 'react-router-dom';
// import LoginButton from './LoginButton';
// import LogoutButton from './LogoutButton';
import { LoginButton, LogoutButton, Profile } from './Auth';
import SearchBar from './SearchBar';

const useStyles = makeStyles(() => ({

    navbar: {
        width: '100%',
        height: '100px',
        backgroundColor: 'black',
    },
    navbar_container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '100px',
    },
    navbar_logo: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        padding: '0.5rem 1rem',

    },
    nav_menu: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2rem',
    },
    nav_item: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 1rem',

    },
    nav_links: {
        textDecoration: 'none',
        color: 'white',
        fontSize: '1rem',
        fontWeight: 'bold',
        padding: '0.5rem 1rem',
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

}));


const NavBar = () => {

    const classes = useStyles();
    const { isLoading, error } = useAuth0();


    return (
        <nav className={classes.navbar}>
            <div className={classes.navbar_container}>
                <Link to="/" className={classes.navbar_logo}>
                    Noteria
                </Link>

                <SearchBar />

                <ul className={classes.nav_menu}>
                    <li className={classes.nav_item}>
                        <Link to="/" className={classes.nav_links}>
                            Home
                        </Link>
                    </li>
                    <li className={classes.nav_item}>
                        <Link to="/about" className={classes.nav_links}>
                            About
                        </Link>
                    </li>
                    <li className={classes.nav_item}>
                        <Link to="/pricing" className={classes.nav_links}>
                            Pricing
                        </Link>
                    </li>

                    <li className={classes.nav_item}>
                        <main>
                            {isLoading ? <p>Loading...</p> : error ? <p>{error.message}</p> :
                                <div>

                                    <LoginButton />
                                    <Box className={classes.wrapper}>
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