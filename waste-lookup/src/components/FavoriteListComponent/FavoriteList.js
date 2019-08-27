import React from "react";
import "./FavoriteList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FavoriteList = props => {
  return (
    <div className="FavoriteList__container">
      <FontAwesomeIcon icon="star" color="#EDD943" />
    </div>
  );
};

export default FavoriteList;
