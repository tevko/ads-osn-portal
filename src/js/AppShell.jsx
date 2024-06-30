import React, { useState } from "react";
import Container from "@mui/material/Container";
import {
  ThemeProvider,
  createTheme,
  TypographyVariants,
} from "@mui/material/styles";

import Header from "./components/Header";
import PurchaseOrders from "./components/PurchaseOrders";
import Receipts from "./components/Receipts";
import Invoices from "./components/Invoices";
import Transfers from "./components/Transfers";
import Home from "./components/Home";
import Admin from "./components/Admin";
import Manage from "./components/Manage";
import VMIInventory from "./components/VMIInventory";
import ProductionSchedule from "./components/ProductionSchedule";
import POSearch from "./components/PO-Search";
import TotalInventory from "./components/TotalInventory";

const routes = {
  "/purchase-orders": (props) => <PurchaseOrders {...props} />,
  "/receipts": (props) => <Receipts {...props} />,
  "/invoices": (props) => <Invoices {...props} />,
  "/transfers": (props) => <Transfers {...props} />,
  "/": (props) => <Home {...props} />,
  "/admin": (props) => <Admin {...props} />,
  "/manage": (props) => <Manage {...props} />,
  "/vmi-inventory": (props) => <VMIInventory {...props} />,
  "/production-schedule": (props) => <ProductionSchedule {...props} />,
  "/po-search": (props) => <POSearch {...props} />,
  "/total-inventory": (props) => <TotalInventory {...props} />,
};

const PageTitles = {
  "/purchase-orders": "Purchase Orders",
  "/receipts": "Receipts",
  "/invoices": "Invoices",
  "/transfers": "Transfers",
  "/": "Home",
  "/admin": "Admin",
  "/manage": "Manage",
  "/vmi-inventory": "VMI Inventory",
  "/production-schedule": "Production Schedule",
  "/po-search": "Search Purchase Orders",
  "/total-inventory": "Total Inventory",
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
      paper: "rgba(52, 55, 68, 0.8)",
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
    routes[window.location.pathname](user)
  );
  const routeTo = (path) => {
    if (path !== window.location.pathname) {
      window.history.pushState(path, null, path);
      setCurrentComponent(routes[path](user));
    }
  };
  window.onpopstate = (event) => {
    if (currentComponent !== routes[window.location.pathname]) {
      setCurrentComponent(routes[event.state](user));
    }
  };
  return (
    <ThemeProvider theme={themeOptions}>
      <Container maxWidth={false} sx={{ maxWidth: "100%" }}>
        <Header
          routeTo={routeTo}
          getPageTitle={getPageTitle}
          logout={logout}
          user={user}
        />
        {currentComponent || <p>404 page not found</p>}
      </Container>
    </ThemeProvider>
  );
}
