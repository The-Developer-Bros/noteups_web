import { useAuth0 } from '@auth0/auth0-react';
import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({

    button: {
        variant: 'contained',
        backgroundColor: 'lightblue',
        width: '150px',
        margin: '0.5rem',
    },
    wrapper: {
        display: 'flex',
    },
    loginDetails: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    userImage: {
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        marginRight: '1rem',
    },

    userInfo: {
        marginTop: '1rem',
        marginBottom: '1rem',
    }


}));

export const LoginButton = () => {

    const { loginWithRedirect, isAuthenticated } = useAuth0();

    const classes = useStyles();

    return (
        !isAuthenticated && (
            <Box className={classes.wrapper}>
                <Button className={classes.button} onClick={() => loginWithRedirect()}>
                    Log in
                </Button>

                <Button className={classes.button} onClick={() => loginWithRedirect()}>
                    Sign up
                </Button>
            </Box>
        )
    )
}




export const LogoutButton = () => {

    const { logout, isAuthenticated } = useAuth0();

    const classes = useStyles();

    return (
        isAuthenticated && (
            <Button className={classes.button} onClick={() => logout({ returnTo: window.location.origin })}>
                Sign Out
            </Button>
        )
    )
}

export const Profile = () => {

    const { user, isAuthenticated } = useAuth0();
    const classes = useStyles();

    return (
        isAuthenticated && (
            <Box className={classes.loginDetails}>
                {/* {JSON.stringify(user)} */}
                {user?.picture && <img src={user.picture} alt={user?.name} className={classes.userImage} />}

                <div className={classes.userInfo}>
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


