import React from 'react';
import './App.css';

import Header from './components/HeaderComponent/Header';
import SearchBar from './components/SearchBarComponent/SearchBar';
import SearchResults from './components/SearchResultComponent/SearchResult';

class App extends React.Component {

  componentDidMount() {
    const Url = 'https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000';
    fetch(Url).then(res => res.json()).then(data => console.log(data));
  }

  render () {
    return (
      <div className="App">
        <Header title="Toronto Waste Lookup"/>
        <div className="SearchSection__container">
        <SearchBar />
        <SearchResults />
        </div>
      </div>
    );
  }
}

export default App;
