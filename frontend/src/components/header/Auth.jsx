import { useAuth0 } from '@auth0/auth0-react';
import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import "./Auth.scss";

export const LoginButton = () => {

    const { loginWithRedirect, isAuthenticated } = useAuth0();


    return (
        !isAuthenticated && (
            <Box className="wrapper">
                <Button
                    color="primary"
                    variant="contained"
                    className="button"
                    onClick={() => loginWithRedirect()}>
                    Sign In
                </Button>
            </Box>
        )
    )
}




export const LogoutButton = () => {

    const { logout, isAuthenticated } = useAuth0();

    return (
        isAuthenticated && (
            <Box className="wrapper">
                <Button
                    color="primary"
                    variant="contained"
                    className="button"
                    onClick={() => logout({ returnTo: window.location.origin })}>
                    Sign Out
                </Button>
            </Box>
        )
    )
}

export const Profile = () => {

    const { user, isAuthenticated } = useAuth0();

    return (
        isAuthenticated && (
            <Box className="loginDetails">
                {/* {JSON.stringify(user)} */}
                {user?.picture && <img src={user.picture} alt={user?.name} className="userImage" />}

                <div className="userInfo">
                    <h4>{user?.name}</h4>
                    {/* <ul>
                        {Object.keys(user).map((key, idx) => {
                            return <li key={idx}>{key}:{user[key]}</li>
                        })}
                    </ul> */}
                </div>

            </Box>
        )
    )
}


