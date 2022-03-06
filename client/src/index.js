import { Auth0Provider } from "@auth0/auth0-react";
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

// Dotenv in react
const domain = process.env.REACT_APP_AUTHO_DOMAIN;
const clientId = process.env.REACT_APP_AUTHO_CLIENT_ID;

console.log(domain, clientId);

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
    // audience={process.env.REACT_APP_AUTH0_AUDIENCE}
    // scope="read:current_user update:current_user_metadata"
    // onRedirectCallback={() => window.history.replaceState({}, document.title, window.location.pathname)}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
