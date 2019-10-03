import React from "react";
import styles from "./FavoriteList.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FavoriteList = props => {
  return (
    <div id={props.id} onClick={props.onclick} className={styles.FavoriteList__container}>
      <div className={styles.FavoriteList__header}>
        <FontAwesomeIcon color={props.color} icon="star" className={styles.FavoriteList__header_icon} />
        <p className="FavoriteList__header--title">{props.title}</p>
      </div>
      <div className="FavoriteList__body" dangerouslySetInnerHTML={props.children}></div>
    </div>
  );
};

export default FavoriteList;
