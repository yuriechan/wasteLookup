import React from "react";
import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import Header from "./components/HeaderComponent/Header";
import SearchBar from "./components/SearchBarComponent/SearchBar";
import SearchResults from "./components/SearchResultComponent/SearchResult";
import FavoriteList from "./components/FavoriteListComponent/FavoriteList";
library.add(faStar);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      userInput: "",
      searched: false,
      matchedData: [],
      favoritedData: [],
    };
  }

  componentDidMount() {
    const Url = "https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000";
    fetch(Url)
      .then(res => res.json())
      .then(data => {
        this.setState({ data: data });
        console.log(this.state.data);
      });
  }

  search(data, query) {
    if (!query.length) {
      this.setState({
        matchedData: [],
      });
      return;
    }

    let lowerCaseQuery = query.toLowerCase();
    console.log(`lowerCaseQuery: ${lowerCaseQuery}`);
    let lengthOfQuery = lowerCaseQuery.length;
    console.log(`lengthOfQuery: ${lengthOfQuery}`);
    while (lowerCaseQuery.charAt(lengthOfQuery - 1) === " ") {
      lowerCaseQuery = lowerCaseQuery.slice(0, lengthOfQuery - 1);
      lengthOfQuery = lowerCaseQuery.length;
      console.log(`lowerCaseQuery: ${lowerCaseQuery}`);
      console.log(`lengthOfQuery: ${lengthOfQuery}`);
    }
    let matchedArr = [];
    for (let i = 0, n = data.length; i < n; i++) {
      let body = data[i].body;
      let txt = document.createElement("textarea");
      txt.innerHTML = body;
      let decodedBody = txt.value;
      console.log(`decodedBody: ${decodedBody}`);
      let bodyText = decodedBody
        .replace(/\<[^<>]*\>/g, "")
        .replace(/&nbsp;/g, " ")
        .toLowerCase();
      console.log(`bodyText: ${bodyText}`);
      let matched = null;
      let scoreAdded = false;
      let score = 0;

      for (let j = 0, m = bodyText.length; j < m; j++) {
        if (matched) {
          score = score + 1;
          scoreAdded = true;
          matched = null;
        } else if (matched === false) {
          matched = null;
        } else if (matched === null) {
          if (query.charAt(0) === bodyText.charAt(j)) {
            for (let k = 1, o = query.length; k < o; k++) {
              if (matched === false) {
                break;
              }
              if (query.charAt(k) === bodyText.charAt(j + k)) {
                matched = true;
              } else {
                matched = false;
              }
            }
          }
        }
      }
      if (scoreAdded) {
        let obj = {};
        obj[i] = score;
        matchedArr.push(obj);
      }
    }
    console.log(matchedArr);

    // this.setState({
    //   matchedData: matchedArr,
    // });
  }

  handleUserInputChange = event => {
    this.setState({
      userInput: event.target.value,
    });
  };

  handleMouseClick = () => {
    this.setState({ searched: true });
    this.search(this.state.data, this.state.userInput);
  };

  handleEnterKey = e => {
    this.setState({ searched: false });
    if (e && e.keyCode === 13) {
      this.setState({ searched: true });
      this.search(this.state.data, this.state.userInput);
    }
  };

  decodeHtmlEntity = html => {
    let txt = document.createElement("textarea");
    txt.innerHTML = html;
    return { __html: txt.value };
  };

  handleStarClick = () => {
    let favoriteArr = this.state.favoritedData;
    this.state.matchedData.forEach(item => {
      let starIcon = document.getElementById(item).getElementsByClassName("SearchResults__header")[0].childNodes[0];
      let starIconColor = starIcon.getAttribute("color");

      if (starIconColor === "#D8D8D8") {
        starIcon.setAttribute("color", "#EDD943");
        favoriteArr.push(item);
      } else if (starIconColor === "#EDD943") {
        starIcon.setAttribute("color", "#D8D8D8");
        favoriteArr.pop(item);
      }
    });
    this.setState({ favoritedData: favoriteArr });
  };

  handleStarColor = item => {
    let wasFavorited = function(data) {
      return data === item;
    };
    return this.state.favoritedData.some(wasFavorited);
  };

  render() {
    let results = null;
    if (this.state.matchedData.length) {
      results = (
        <div>
          {this.state.matchedData.map(item => {
            return (
              <SearchResults
                id={item}
                color={this.handleStarColor(item) ? "#EDD943" : "#D8D8D8"}
                onclick={this.handleStarClick}
                key={item}
                title={this.state.data[item].title}
                children={this.decodeHtmlEntity(this.state.data[item].body)}
              />
            );
          })}
        </div>
      );
    } else if (this.state.searched) {
      results = <div>no result</div>;
    }
    return (
      <div className="App">
        <Header title="Toronto Waste Lookup" />
        <div className="SearchSection__container">
          <SearchBar
            onclick={() => {
              this.handleMouseClick();
            }}
            onchange={this.handleUserInputChange}
            value={this.state.userInput}
            onkeydown={e => {
              this.handleEnterKey(e);
            }}
          />
          {results}
        </div>
        <FavoriteList
          children={this.state.favoritedData.map(item => {
            return (
              <SearchResults
                color={this.handleStarColor(item) ? "#EDD943" : "#D8D8D8"}
                onclick={this.handleStarClick}
                id={item}
                key={item}
                title={this.state.data[item].title}
                children={this.decodeHtmlEntity(this.state.data[item].body)}
              />
            );
          })}
        />
      </div>
    );
  }
}

export default App;
