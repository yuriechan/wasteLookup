import React from 'react';
import './SearchBar.css';
import { InputGroup, InputGroupAddon, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBar = (props) => {
    return (
        <div className="SearchBar__container">
        <InputGroup>
            <InputGroupAddon addonType="prepend">
                <FontAwesomeIcon icon={faSearch}/>
            </InputGroupAddon>
            <Input placeholder="search" />
        </InputGroup>
        </div>
    );
};

export default SearchBar;