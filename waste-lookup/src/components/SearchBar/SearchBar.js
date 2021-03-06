import React from "react";
import "./SearchBar.css";
import { InputGroup, InputGroupAddon, Input, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="SearchBar__container">
        <InputGroup className="SearchBar__wrapper">
          <Input
            type="text"
            placeholder="search"
            onChange={this.props.onchange}
            onKeyDown={this.props.onkeydown}
            value={this.props.value}
          />
          <InputGroupAddon addonType="append">
            <Button onClick={this.props.onclick}>
              <FontAwesomeIcon icon={faSearch} />
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </div>
    );
  }
}

export default SearchBar;
