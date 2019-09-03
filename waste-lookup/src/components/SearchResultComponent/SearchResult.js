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
      <div onClick={this.props.onclick} id={this.props.id} className="SearchResults__container">
        <FontAwesomeIcon color={this.props.color} icon="star" />
        <p>{this.props.title}</p>
        <p dangerouslySetInnerHTML={this.props.children}></p>
      </div>
    );
  }
}
export default SearchResult;
