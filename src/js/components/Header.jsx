import React, { useState } from "react";
import "../../css/main.scss";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export default function Header({ routeTo, getPageTitle, logout, user }) {
  const role = user["https://mzfweb2.adssglobal.net/api/roles"][0];
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigateAndClose = (path) => {
    routeTo(path);
    handleClose();
  };

  const productionScheduleViewerNav = (
    <MenuItem
      onClick={() => {
        navigateAndClose("/production-schedule");
      }}
    >
      Production Schedule
    </MenuItem>
  );

  const fullNav = (
    <>
      <MenuItem
        onClick={() => {
          navigateAndClose("/purchase-orders");
        }}
      >
        Purchase Orders
      </MenuItem>
      {role === "Admin" && (
        <MenuItem
          onClick={() => {
            navigateAndClose("/production-schedule");
          }}
        >
          Production Schedule
        </MenuItem>
      )}
      <MenuItem onClick={() => navigateAndClose("/receipts")}>
        Receipts
      </MenuItem>
      <MenuItem onClick={() => navigateAndClose("/transfers")}>
        Transfers
      </MenuItem>
      <MenuItem onClick={() => navigateAndClose("/invoices")}>
        Invoices
      </MenuItem>
      <MenuItem onClick={() => navigateAndClose("/vmi-inventory")}>
        VMI Inventory
      </MenuItem>
      {role === "Admin" ? (
        <MenuItem onClick={() => navigateAndClose("/admin")}>
          Admin
        </MenuItem>
      ) : (
        <MenuItem onClick={() => navigateAndClose("/manage")}>
          Manage
        </MenuItem>
      )}
    </>
  )

  return (
    <div className="header">
      <Box
        sx={{
          flexGrow: 1,
        }}
      >
        <AppBar position="static" color="default">
          <Toolbar>
            <IconButton
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              size="large"
              edge="start"
              aria-label="menu"
              color="primary"
              sx={{
                mr: 2,
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
              }}
            >
              {getPageTitle()}
            </Typography>
            <Button
              color="inherit"
              onClick={() => {
                window.localStorage.removeItem("_A_C_T_");
                logout({ returnTo: window.location.origin });
              }}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={() => navigateAndClose("/")}>Home</MenuItem>
          {role === "prod_schedule_viewer" ? productionScheduleViewerNav : fullNav}
        </Menu>
      </Box>
    </div>
  );
}
