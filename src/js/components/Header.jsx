import React from "react";
import logo_black from "../../css/images/logo_black.png";
import header from "../../css/header.scss";

export default function Header() {
  return (
    <header>
      <img src={logo_black} className="header_logo" />
      <h1>Test</h1>
    </header>
  );
}
