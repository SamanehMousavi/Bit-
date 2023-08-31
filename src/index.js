import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { UserProvider } from "./UserContext";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

if (process.env.NODE_ENV === "production") disableReactDevTools();

const clientId = process.env.REACT_APP_AUTH0_CLIENT;
const domain = process.env.REACT_APP_AUTH0_DOMAIN;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={window.location.origin}
  >
    <UserProvider>
      <App />
    </UserProvider>
  </Auth0Provider>
  // </React.StrictMode>
);
