import React from 'react';
import './SearchBar.css';
import { InputGroup, InputGroupAddon, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBar = (props) => {
    return (
        <InputGroup className="SearchBar__container">
            <InputGroupAddon>
                <FontAwesomeIcon icon={faSearch}/>
            </InputGroupAddon>
            <Input placeholder="search" />
        </InputGroup>
    );
};

export default SearchBar;