import React from "react";
import logo_black from "../../css/images/logo_black.png";
import "../../css/header.scss";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@mui/material/Button";

export default function Header() {
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout } =
    useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div>
      <img src={logo_black} className="header_logo" />
      <AppShell user={user} logout={logout} />) : ( // add footer with logout
      button
      <Button variant="contained" onClick={() => loginWithRedirect()}>
        Log In
      </Button>
      );
    </div>
  );
}
