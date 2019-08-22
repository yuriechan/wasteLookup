import React from 'react';
import { InputGroup, InputGroupAddon, Input } from 'reactstrap';

const SearchBar = (props) => {
    return (
        <InputGroup>
        <InputGroupAddon addonType="prepend"></InputGroupAddon>
        <Input placeholder="search" />
        </InputGroup>
    )
}

export default SearchBar;