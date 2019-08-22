import React from 'react';
import { InputGroup, InputGroupAddon, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBar = (props) => {
    return (
        <InputGroup>
            <InputGroupAddon>
                <FontAwesomeIcon icon={faSearch}/>
            </InputGroupAddon>
            <Input placeholder="search" />
        </InputGroup>
    );
};

export default SearchBar;