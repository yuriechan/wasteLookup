import React from 'react';
import './Header.css';

function Header (props) {
return(
    <header className="Header__container">
        <h2 className="Header__text">{props.title}</h2>
    </header>
)}
  
export default Header;