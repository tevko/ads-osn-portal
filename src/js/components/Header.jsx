import React from "react";
import logo_black from "../../css/images/logo_black.png";
import "../../css/main.scss";
import Button from "@mui/material/Button";

export default function Header() {
  return (
    <div className="header">
      <img src={logo_black} className="header_logo" />
      <Button variant="contained">Logout</Button>
    </div>
  );
}
