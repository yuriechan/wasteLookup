import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchResult = props => {
  return (
    <div id={props.id} onClick={props.onclick} className="SearchResults__container">
      <div className="SearchResults__header">
        <FontAwesomeIcon color={props.color} icon="star" className="SearchResults__header--icon" />
        <p className="SearchResults__header--title">{props.title}</p>
      </div>
      <div className="SearchResults__body" dangerouslySetInnerHTML={props.children}></div>
    </div>
  );
};

export default SearchResult;
