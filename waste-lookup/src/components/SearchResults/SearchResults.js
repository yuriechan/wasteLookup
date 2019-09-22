import React from "react";
import "./SearchResults.css";
import SearchResult from "./SearchResult/SearchResult";

const SearchResults = props => {
  return props.matchedData.map(item => {
    return (
      <div className="SearchResults__wrapper">
        <SearchResult
          id={Object.keys(item)}
          color={props.starColor(Object.keys(item)[0]) ? "#EDD943" : "#D8D8D8"}
          onclick={event => props.starClicked(event)}
          key={Object.keys(item)}
          title={props.data[Object.keys(item)].title}
          children={props.decodeHtmlEntity(props.data[Object.keys(item)].body)}
        />
      </div>
    );
  });
};
export default SearchResults;
