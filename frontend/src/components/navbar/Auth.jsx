import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button } from "@mui/material";

import "./Auth.scss";

export const Auth0LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    !isAuthenticated && (
      <Box className="wrapper">
        <Button
          color="primary"
          variant="contained"
          className="button"
          onClick={() => loginWithRedirect()}
        >
          Sign In
        </Button>
      </Box>
    )
  );
};

export const Auth0LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <Box className="wrapper">
        <Button
          color="primary"
          variant="contained"
          className="button"
          onClick={() => logout({ returnTo: window.location.origin })}
        >
          Sign Out
        </Button>
      </Box>
    )
  );
};

export const Auth0Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <Box className="loginDetails">
        {/* {JSON.stringify(user)} */}
        {user?.picture && (
          <img src={user.picture} alt={user?.name} className="userImage" />
        )}

        <div className="userInfo">
          <h4>{user?.name}</h4>
          <ul>
            {Object.keys(user).map((key, idx) => {
              return (
                <li key={idx}>
                  {key}:{user[key]}
                </li>
              );
            })}
          </ul>
        </div>
      </Box>
    )
  );
};
