import React from "react";
import "./SearchResult.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchResult = props => {
  return (
    <div onClick={props.onclick} id={props.id} className="SearchResults__container">
      <FontAwesomeIcon color={props.color} icon="star" />
      <p>{props.title}</p>
      <p dangerouslySetInnerHTML={props.children}></p>
    </div>
  );
};

export default SearchResult;
