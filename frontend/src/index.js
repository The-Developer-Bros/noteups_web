import { Auth0Provider } from "@auth0/auth0-react";
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import App from './App';
import './index.scss';
import { store } from "./redux/store";

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
      audience={`https://${domain}/userinfo`}
      scope="read:current_user"
      onRedirectCallback={() => window.history.replaceState({}, document.title, window.location.pathname)}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
