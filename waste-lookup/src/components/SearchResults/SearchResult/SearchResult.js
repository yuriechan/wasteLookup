import React from "react";
import styles from "./SearchResult.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchResult = props => {
  return (
    <div id={props.id} onClick={props.onclick} className={styles.SearchResult__container}>
      <div className={styles.SearchResult__header}>
        <FontAwesomeIcon color={props.color} icon="star" className={styles.SearchResult__header_icon} />
        <p className={styles.SearchResult__header_title}>{props.title}</p>
      </div>
      <div className={styles.SearchResult__body} dangerouslySetInnerHTML={props.children}></div>
    </div>
  );
};

export default SearchResult;
