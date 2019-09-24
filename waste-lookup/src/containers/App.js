import React from "react";
import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import Header from "../components/Header/Header";
import SearchBar from "../components/SearchBar/SearchBar";
import SearchResults from "../components/SearchResults/SearchResults";
import FavoriteModal from "../components/FavoriteModal/FavoriteModal";
import { filterUserInput, filterHTMLEntitity, orderByDescending } from "../utils/utils";
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

  scoringData(data, property, query, arr) {
    let userInput = filterUserInput(query);
    let lowerCaseQuery = userInput[0];
    let lengthOfQuery = userInput[1];

    let matchedArr = arr;
    let matchingArr = [];
    for (let i = 0, n = data.length; i < n; i++) {
      let body = data[i][property];
      let bodyText = "";
      if (property === "body") {
        bodyText = filterHTMLEntitity(body);
      } else {
        bodyText = body;
      }

      let sameChar = false;
      let scoreAdded = false;
      let score = 0;

      for (let j = 0, m = bodyText.length; j < m; j++) {
        if (lowerCaseQuery.charAt(0) === bodyText.charAt(j)) {
          for (let k = 1, o = lengthOfQuery; k < o; k++) {
            if (lowerCaseQuery.charAt(k) === bodyText.charAt(j + k)) {
              sameChar = true;
            } else {
              sameChar = false;
              break;
            }
          }
          if (sameChar) {
            score = score + 1;
            scoreAdded = true;
          }
        } else {
          continue;
        }
      }
      if (scoreAdded) {
        let obj = {};
        obj[i] = score;
        matchingArr.push(obj);
      }
    }

    for (let g = 0, r = matchingArr.length; g < r; g++) {
      if (matchedArr.length) {
        let foundSameKey = false;
        for (let f = 0, s = matchedArr.length; f < s; f++) {
          if (Object.keys(matchedArr[f])[0] === Object.keys(matchingArr[g])[0]) {
            foundSameKey = true;
          } else {
            foundSameKey = false;
          }
          if (foundSameKey) {
            let valueOfMatchedItem = matchedArr[f][Object.keys(matchedArr[f])];
            let valueOfMatchingItem = matchingArr[g][Object.keys(matchingArr[g])];
            valueOfMatchedItem += valueOfMatchingItem;
            matchedArr[f][Object.keys(matchedArr[f])] = valueOfMatchedItem;
            break;
          }
        }
        if (!foundSameKey) {
          matchedArr.push(matchingArr[g]);
        }
      } else {
        matchedArr.push(matchingArr[g]);
      }
    }
    return matchedArr;
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
    let matchedArr = [];

    let bodyArr = this.scoringData(data, context.body, query, matchedArr);
    let titleArr = this.scoringData(data, context.title, query, bodyArr);
    let categoryArr = this.scoringData(data, context.category, query, titleArr);
    let keywordsArr = this.scoringData(data, context.keywords, query, categoryArr);
    let totalArr = orderByDescending(keywordsArr);
    this.setState({
      matchedData: totalArr,
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

  handleStarClick = event => {
    event.preventDefault();
    let favoriteArr = this.state.favoritedData;
    let id = event.currentTarget.id;
    let starIcon = document.getElementById(id).getElementsByClassName("SearchResults__header")[0].childNodes[0];
    let starIconColor = starIcon.getAttribute("color");

    if (starIconColor === "#D8D8D8") {
      starIcon.setAttribute("color", "#EDD943");
      favoriteArr.push(id);
    } else if (starIconColor === "#EDD943") {
      starIcon.setAttribute("color", "#D8D8D8");
      let index = favoriteArr.indexOf(id);
      if (index > -1) {
        favoriteArr.splice(index, 1);
      }
    }
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
          <SearchResults
            matchedData={this.state.matchedData}
            starColor={this.handleStarColor}
            starClicked={this.handleStarClick}
            data={this.state.data}
          />
        </div>
      );
    } else if (this.state.searched) {
      results = <div>no result</div>;
    }
    return (
      <div className="App">
        <Header />
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
        <FavoriteModal
          starClicked={this.handleStarClick}
          starColor={this.handleStarColor}
          data={this.state.data}
          favoritedData={this.state.favoritedData}
        />
      </div>
    );
  }
}

export default App;
