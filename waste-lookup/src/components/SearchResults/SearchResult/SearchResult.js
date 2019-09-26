import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchResult = props => {
  return (
    <div id={props.id} onClick={props.onclick} className="SearchResult__container">
      <div className="SearchResult__header">
        <FontAwesomeIcon color={props.color} icon="star" className="SearchResult__header--icon" />
        <p className="SearchResult__header--title">{props.title}</p>
      </div>
      <div className="SearchResult__body" dangerouslySetInnerHTML={props.children}></div>
    </div>
  );
};

export default SearchResult;
