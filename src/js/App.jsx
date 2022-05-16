import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../css/main.scss";
import * as React from "react";
import Button from "@mui/material/Button";
import logo from "../images/logo.jpeg";

import AppShell from "./AppShell";

const App = () => {
  const {
    user,
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    logout,
    getAccessTokenSilently,
  } = useAuth0();

  const [token, setToken] = useState(null);

  useEffect(() => {
    const f = async () => {
      if (isAuthenticated) {
        const token = await getAccessTokenSilently();
        window.localStorage.setItem("_A_C_T_", token);
        setToken(token);
      }
    };
    f();
  }, [isAuthenticated]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return isAuthenticated && token ? (
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
