import React from "react";
import "./SearchResult.css";

const SearchResult = props => {
  return (
    <div className="SearchResults__container">
      <textarea>{props.title}</textarea>
      <textarea>{props.children}</textarea>
    </div>
  );
};

export default SearchResult;
