import { ChakraProvider } from "@chakra-ui/react";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
// import { store } from "./redux/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import "./index.scss";
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
// const domain = process.env.REACT_APP_AUTHO_DOMAIN;
// const clientId = process.env.REACT_APP_AUTHO_CLIENT_ID;

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
        <ChakraProvider
          theme={{
            fonts: {
              body: "system-ui, sans-serif",
              heading: "system-ui, sans-serif",
              monospace: "Menlo, monospace",
            },
            fontWeights: {
              body: 400,
              heading: 700,
              bold: 700,
            },
            lineHeights: {
              body: 1.5,
              heading: 1.125,
            },
            fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
            space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
            sizes: {
              container: "1140px",
            },
          }}
        >
          {/* <GlobalStyle /> */}
          <App />
        </ChakraProvider>
      </PersistGate>
    </Provider>
    {/* </Auth0Provider> */}
  </>,
  document.getElementById("root")
);
