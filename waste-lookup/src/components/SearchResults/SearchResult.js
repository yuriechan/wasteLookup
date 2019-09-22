import React from "react";
import "./SearchResult.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class SearchResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div id={this.props.id} onClick={this.props.onclick} className="SearchResults__container">
        <div className="SearchResults__header">
          <FontAwesomeIcon color={this.props.color} icon="star" className="SearchResults__header--icon" />
          <p className="SearchResults__header--title">{this.props.title}</p>
        </div>
        <div className="SearchResults__body" dangerouslySetInnerHTML={this.props.children}></div>
      </div>
    );
  }
}
export default SearchResult;
