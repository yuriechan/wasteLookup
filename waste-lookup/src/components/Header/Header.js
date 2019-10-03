import React from "react";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.Header__container}>
      <h3 className={styles.Header__text}>Toronto Waste Lookup</h3>
    </header>
  );
};

export default Header;
