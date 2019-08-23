import React from "react";
import "./SearchResult.css";

const SearchResult = props => {
  return (
    <div className="SearchResults__container">
      <p>{props.title}</p>
      <p>{props.children}</p>
    </div>
  );
};

export default SearchResult;
