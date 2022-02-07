import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@mui/material/Button";

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
    // add footer with logout button
    <Button variant="contained" onClick={() => loginWithRedirect()}>
      Log In
    </Button>
  );
};

export default App;
