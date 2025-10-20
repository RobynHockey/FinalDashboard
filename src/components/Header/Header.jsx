import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <img src="/logoverispatial.png" alt="VeriSpatial Logo" className="header-logo" />
        <h1 className="header-title">VeriSpatial Dashboard</h1>
      </div>
    </header>
  );
};

export default Header;
