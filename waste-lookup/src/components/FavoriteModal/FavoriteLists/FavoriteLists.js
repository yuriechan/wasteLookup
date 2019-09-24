import React from "react";
import FavoriteList from "./FavoriteList/FavoriteList";
import "./FavoriteLists.css";
import { decodeHtmlEntity } from "../../../utils/utils";

const FavoriteLists = props => {
  return props.favoritedData.map(item => {
    return (
      <FavoriteList
        id={item}
        key={item}
        onclick={event => props.starClicked(event)}
        color={props.starColor(item) ? "#EDD943" : "#D8D8D8"}
        title={props.data[item].title}
        children={decodeHtmlEntity(props.data[item].body)}
      />
    );
  });
};

export default FavoriteLists;
