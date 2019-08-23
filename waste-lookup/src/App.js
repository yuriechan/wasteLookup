import React from "react";
import "./App.css";

import Header from "./components/HeaderComponent/Header";
import SearchBar from "./components/SearchBarComponent/SearchBar";
import SearchResults from "./components/SearchResultComponent/SearchResult";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      json: "",
      userInput: "",
      btnClicked: false,
      matchedItem: null,
    };
  }

  componentDidMount() {
    const Url = "https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000";
    fetch(Url)
      .then(res => res.json())
      .then(data => {
        this.setState({ json: data });
        console.log(this.state.json);
      });
  }

  search(data, query) {
    if (!query.length) {
      return false;
    }
    let lowerCaseQuery = query.toLowerCase().replace(/\s/g, "");
    let matchedArr = [];
    for (let i = 0, n = data.length; i < n; i++) {
      let keywordArr = data[i].keywords.replace(/\s/g, "").split(",");
      let matchedOnce = false;
      for (let j = 0, m = keywordArr.length; j < m; j++) {
        if (lowerCaseQuery === keywordArr[j]) {
          matchedArr.push(i);
          matchedOnce = true;
        }
        if (matchedOnce) {
          break;
        }
      }
    }
    this.setState({
      matchedItem: matchedArr,
    });
  }

  handleUserInputChange = event => {
    this.setState({
      userInput: event.target.value,
    });
  };

  handleSearchClick = () => {
    this.setState({ btnClicked: true });
  };

  render() {
    let results = null;
    if (this.state.btnClicked) {
      results = !this.state.matchedItem ? (
        <div>no result</div>
      ) : (
        <div>
          {this.state.matchedItem.map(item => {
            return <SearchResults title={this.state.json[item].title} children={this.state.json[item].body} />;
          })}
        </div>
      );
    }
    return (
      <div className="App">
        <Header title="Toronto Waste Lookup" />
        <div className="SearchSection__container">
          <SearchBar
            clicked={() => {
              this.handleSearchClick();
              this.search(this.state.json, this.state.userInput);
            }}
            changed={this.handleUserInputChange}
            value={this.state.userInput}
          />
          {results}
        </div>
      </div>
    );
  }
}

export default App;
