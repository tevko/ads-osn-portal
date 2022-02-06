import ReactDOM from "react-dom";
import { Auth0Provider } from "@auth0/auth0-react";

import App from "./App";

const app = document.getElementById("app");
ReactDOM.render(
  <Auth0Provider
    domain="dev-u68d-m8y.us.auth0.com"
    clientId="jmwfHSAWgsYYDJOy7c0k11Z6Q2muknWb"
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>,
  app
);
