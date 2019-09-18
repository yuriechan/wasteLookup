import React from "react";
import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import Header from "./components/HeaderComponent/Header";
import SearchBar from "./components/SearchBarComponent/SearchBar";
import SearchResults from "./components/SearchResultComponent/SearchResult";
import FavoriteList from "./components/FavoriteListComponent/FavoriteList";
library.add(faStar);

function filterUserInput(query) {
  let lowerCaseQuery = query.toLowerCase();
  let lengthOfQuery = lowerCaseQuery.length;
  while (lowerCaseQuery.charAt(lengthOfQuery - 1) === " ") {
    lowerCaseQuery = lowerCaseQuery.slice(0, lengthOfQuery - 1);
    lengthOfQuery = lowerCaseQuery.length;
  }
  return [lowerCaseQuery, lengthOfQuery];
}

function filterHTMLEntitity(body) {
  let txt = document.createElement("textarea");
  txt.innerHTML = body;
  let decodedBody = txt.value;
  let bodyText = decodedBody
    .replace(/\<[^<>]*\>/g, "")
    .replace(/&nbsp;/g, " ")
    .toLowerCase();
  return bodyText;
}

function addValueOfSameKey(matchedArr, matchingArr) {
  for (let l = 0, p = matchingArr.length; l < p; l++) {
    if (matchedArr.length) {
      let foundSameKey = false;
      for (let h = 0, q = matchedArr.length; h < q; h++) {
        let keyNameOfMatchingArray = Object.keys(matchingArr[l])[0];
        if (matchedArr[h][keyNameOfMatchingArray]) {
          foundSameKey = true;
          matchedArr[h][keyNameOfMatchingArray] += matchingArr[l][keyNameOfMatchingArray];
        }
      }
      if (!foundSameKey) {
        matchedArr.push(matchingArr[l]);
      }
    } else {
      matchedArr.push(matchingArr[l]);
    }
  }
  return matchedArr;
}

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
    this.search = this.search.bind(this);
    this.scoringData = this.scoringData.bind(this);
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

  scoringData(data, property, query) {
    let userInput = filterUserInput(query);
    let lowerCaseQuery = userInput[0];
    let lengthOfQuery = userInput[1];

    let matchedArr = [];
    let matchingArr = [];
    for (let i = 0, n = data.length; i < n; i++) {
      let body = data[i][property];
      let bodyText = filterHTMLEntitity(body);
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
          if (lowerCaseQuery.charAt(0) === bodyText.charAt(j)) {
            for (let k = 1, o = lengthOfQuery; k < o; k++) {
              if (matched === false) {
                break;
              }
              if (lowerCaseQuery.charAt(k) === bodyText.charAt(j + k)) {
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
        matchingArr.push(obj);
      }
    }
    let totalMatchedArr = addValueOfSameKey(matchedArr, matchingArr);
    return totalMatchedArr;
  }

  search(data, query) {
    if (!query.length) {
      this.setState({
        matchedData: [],
      });
      return;
    }
    const context = {
      body: "body",
      title: "title",
      category: "category",
      keywords: "keywords",
    };
    this.setState({
      matchedData: [],
    });
    let matchedArr = [];

    let bodyArr = this.scoringData(data, context.body, query);
    let titleArr = this.scoringData(data, context.title, query);
    let categoryArr = this.scoringData(data, context.category, query);
    let keywordsArr = this.scoringData(data, context.keywords, query);

    let totalArr = matchedArr.concat(bodyArr, titleArr, categoryArr, keywordsArr);
    let totalMatchedArr = addValueOfSameKey(matchedArr, totalArr);
    this.setState({
      matchedData: totalMatchedArr,
    });
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
        <div className="SearchResults__wrapper">
          {this.state.matchedData.map(item => {
            return (
              <SearchResults
                id={Object.keys(item)}
                color={this.handleStarColor(Object.keys(item)) ? "#EDD943" : "#D8D8D8"}
                onclick={this.handleStarClick}
                key={Object.keys(item)}
                title={this.state.data[Object.keys(item)].title}
                children={this.decodeHtmlEntity(this.state.data[Object.keys(item)].body)}
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
