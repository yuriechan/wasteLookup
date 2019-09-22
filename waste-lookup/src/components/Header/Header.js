import React from "react";
import "./Header.css";

function Header(props) {
  return (
    <header className="Header__container">
      <h3 className="Header__text">{props.title}</h3>
    </header>
  );
}

export default Header;
