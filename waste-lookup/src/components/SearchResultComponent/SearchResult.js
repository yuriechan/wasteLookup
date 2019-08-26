import React from "react";
import "./SearchResult.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const SearchResult = props => {
  return (
    <div className="SearchResults__container">
      <FontAwesomeIcon icon={faStar} />
      <p>{props.title}</p>
      <p>{props.children}</p>
    </div>
  );
};

export default SearchResult;
