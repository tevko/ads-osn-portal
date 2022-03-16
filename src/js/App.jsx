import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../css/main.scss";
import * as React from "react";
import Button from "@mui/material/Button";
import logo from "../images/logo.jpeg";

import AppShell from "./AppShell";

const App = () => {
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout } =
    useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return isAuthenticated ? (
    <AppShell user={user} logout={logout} />
  ) : (
    <div className="login_header">
      <img className="logo" src={logo} />
      <Button
        style={{ background: "#FF3E00", width: "100px" }}
        variant="contained"
        onClick={() => loginWithRedirect()}
        className="login_btn"
      >
        Log In
      </Button>
      <h1 className="login_heading">Vendor Portal</h1>
    </div>
  );
};

export default App;
