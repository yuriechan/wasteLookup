import React from "react";
import styles from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      width: window.innerWidth,
    };
  }
  componentWillMount() {
    window.addEventListener("resize", this.handleWindowSizeChange);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSizeChange);
  }
  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };
  render() {
    const { width } = this.state;
    const isMobile = width <= 500;
    let headerContent = null;
    if (isMobile) {
      headerContent = <FontAwesomeIcon icon={"trash-alt"} />;
    } else {
      headerContent = "Toronto Waste Lookup";
    }
    return (
      <header className={styles.Header__container}>
        <h3 className={styles.Header__text}>{headerContent}</h3>
      </header>
    );
  }
}

export default Header;
