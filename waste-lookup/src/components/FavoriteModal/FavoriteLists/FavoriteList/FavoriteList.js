import React from "react";
import "./FavoriteList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FavoriteList = props => {
  return (
    <div id={props.id} onClick={props.onclick}>
      <div className="FavoriteList__header">
        <FontAwesomeIcon color={props.color} icon="star" className="FavoriteList__header--icon" />
        <p className="FavoriteList__header--title">{props.title}</p>
      </div>
      <div className="FavoriteList__body" dangerouslySetInnerHTML={props.children}></div>
    </div>
  );
};

export default FavoriteList;
