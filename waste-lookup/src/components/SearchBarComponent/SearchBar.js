import React from "react";
import "./SearchBar.css";
import { InputGroup, InputGroupAddon, Input, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar = props => {
  return (
    <div className="SearchBar__container">
      <InputGroup className="SearchBar__wrapper">
        <Input type="text" placeholder="search" onChange={props.onchange} onKeyDown={props.onkeydown} value={props.value} />
        <InputGroupAddon addonType="append">
          <Button onClick={props.onclick}>
            <FontAwesomeIcon icon={faSearch} />
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
};

export default SearchBar;
