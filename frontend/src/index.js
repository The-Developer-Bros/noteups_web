import { Auth0Provider } from "@auth0/auth0-react";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import "./index.scss";
// import { store } from "./redux/store";

import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import store from "./redux/store/store";
Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

// Dotenv in react
const domain = process.env.REACT_APP_AUTHO_DOMAIN;
const clientId = process.env.REACT_APP_AUTHO_CLIENT_ID;

let persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    {/* <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      audience={`https://${domain}/userinfo`}
      scope="read:current_user"
      onRedirectCallback={() => window.history.replaceState({}, document.title, window.location.pathname)}
    > */}
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
    {/* </Auth0Provider> */}
  </>,
  document.getElementById("root")
);

// if (process.env.NODE_ENV !== 'production' && module.hot) {
//   module.hot.accept('./App', () => {
//     const NextApp = require('./App').default;
//     ReactDOM.render(
//       <React.StrictMode>
//         <Provider store={store}>
//           <PersistGate loading={null} persistor={store.persistor}>
//             <NextApp />
//           </PersistGate>
//         </Provider>
//       </React.StrictMode>,
//       document.getElementById('root')
//     );
//   });
// }
