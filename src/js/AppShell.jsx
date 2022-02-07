import React from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

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

export default function AppShell(user, logout) {
  return (
    <Container maxWidth="lg">
      {routes[window.location.pathname] || <p>404 page not found</p>}
      {/* Include header nav and footer components https://mui.com/components/app-bar/ */}
      {/* <Button
        variant="contained"
        onClick={() => logout({ returnTo: window.location.origin })}
      >
        Logout
      </Button> */}
    </Container>
  );
}
