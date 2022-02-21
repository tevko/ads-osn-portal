import React, { useState } from "react";
import "../../css/main.scss";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export default function Header({ routeTo, getPageTitle }) {
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

  return (
    <div className="header">
      <Box
        sx={{
          flexGrow: 1,
        }}
      >
        <AppBar position="static">
          <Toolbar>
            <IconButton
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
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
            <Button color="inherit">Logout</Button>
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
          <MenuItem onClick={() => navigateAndClose("/invoices")}>
            Invoices
          </MenuItem>
          <MenuItem onClick={() => navigateAndClose("/purchase-orders")}>
            Purchase Orders
          </MenuItem>
          <MenuItem onClick={() => navigateAndClose("/receipts")}>
            Receipts
          </MenuItem>
          <MenuItem onClick={() => navigateAndClose("/transfers")}>
            Transfers
          </MenuItem>
        </Menu>
      </Box>
    </div>
  );
}
