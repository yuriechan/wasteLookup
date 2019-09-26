import React from "react";
import "./SearchResults.css";
import SearchResult from "./SearchResult/SearchResult";
import { decodeHtmlEntity } from "../../utils/utils";

const SearchResults = props => {
  return props.matchedData.map(item => {
    return (
      <SearchResult
        id={Object.keys(item)}
        color={props.starColor(Object.keys(item)[0]) ? "#EDD943" : "#D8D8D8"}
        onclick={event => props.starClicked(event)}
        key={Object.keys(item)}
        title={props.data[Object.keys(item)].title}
        children={decodeHtmlEntity(props.data[Object.keys(item)].body)}
      />
    );
  });
};
export default SearchResults;
