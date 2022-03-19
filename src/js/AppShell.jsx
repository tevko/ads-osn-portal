import React, { useState } from "react";
import Container from "@mui/material/Container";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import Header from "./components/Header";
import PurchaseOrders from "./components/PurchaseOrders";
import Receipts from "./components/Receipts";
import Invoices from "./components/Invoices";
import Transfers from "./components/Transfers";
import Home from "./components/Home";

const routes = {
  "/purchase-orders": <PurchaseOrders />,
  "/receipts": <Receipts />,
  "/invoices": <Invoices />,
  "/transfers": <Transfers />,
  "/": <Home />,
};

const PageTitles = {
  "/purchase-orders": "Purchase Orders",
  "/receipts": "Receipts",
  "/invoices": "Invoices",
  "/transfers": "Transfers",
  "/": "Home",
};

const themeOptions = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ff5414",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#ff5414",
      paper: "#33353e",
    },
    text: {
      primary: "#fff",
      secondary: "#ccc",
    },
  },
});

const getPageTitle = () => {
  return PageTitles[window.location.pathname] || "Home";
};

export default function AppShell({ user, logout }) {
  const [currentComponent, setCurrentComponent] = useState(
    routes[window.location.pathname]
  );
  const routeTo = (path) => {
    if (path !== window.location.pathname) {
      window.history.pushState(path, null, path);
      setCurrentComponent(routes[path]);
    }
  };
  window.onpopstate = (event) => {
    if (currentComponent !== routes[window.location.pathname]) {
      setCurrentComponent(routes[event.state]);
    }
  };
  return (
    <ThemeProvider theme={themeOptions}>
      <Container maxWidth="lg">
        <Header routeTo={routeTo} getPageTitle={getPageTitle} logout={logout} />
        {currentComponent || <p>404 page not found</p>}
        {/* Include header nav and footer components https://mui.com/components/app-bar/ */}
      </Container>
    </ThemeProvider>
  );
}
