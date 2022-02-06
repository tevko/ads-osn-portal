import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@mui/material/Button";

const App = () => {
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout } =
    useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return isAuthenticated ? (
    // <AppRoutes user={user} />
    <p>
      App routes go here
      <Button
        variant="contained"
        onClick={() => logout({ returnTo: window.location.origin })}
      >
        Logout
      </Button>
    </p>
  ) : (
    // add footer with logout button
    <Button variant="contained" onClick={() => loginWithRedirect()}>
      Log In
    </Button>
  );
};

export default App;
