import React from "react";
import searchResult_styles from "../components/SearchResults/SearchResult/SearchResult.module.css";
import favlist_styles from "../components/FavoriteModal/FavoriteLists/FavoriteList/FavoriteList.module.css";
import app_styles from "./App.module.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import Header from "../components/Header/Header";
import SearchBar from "../components/SearchBar/SearchBar";
import SearchResults from "../components/SearchResults/SearchResults";
import { filterHTMLEntity, orderByDescending, removeFavoriteItem, exactMatch, createObjectArr, addPrefix } from "../utils/utils";
library.add(faStar, faTrashAlt);

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

    let scoreArr = [];
    const property = ["body", "category", "title", "keywords"];

    for (let i = 0, n = data.length; i < n; i++) {
      let score = 0;
      for (let j = 0, m = property.length; j < m; j++) {
        let context = null;
        if (property[j] === "body") {
          context = filterHTMLEntity(data[i][property[j]]);
        } else {
          context = data[i][property[j]];
        }
        score = score + exactMatch(query, context);
        score = score + addPrefix(query, context);
      }
      if (score) {
        scoreArr.push(createObjectArr(i, score));
      }
    }

    let scoreDescendingArr = orderByDescending(scoreArr);
    this.setState({
      matchedData: scoreDescendingArr,
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
    let className = event.currentTarget.getAttribute("class");
    let targetClassList = event.currentTarget.classList;
    let resultContainer = document.getElementById(id);
    let starIcon = document.getElementById(id).getElementsByClassName(searchResult_styles.SearchResult__header_icon)[0];
    let starIconColor = starIcon.getAttribute("color");
    if (targetClassList.contains(searchResult_styles.SearchResult__container)) {
      if (starIconColor === "#D8D8D8") {
        starIcon.setAttribute("color", "#EDD943");
        resultContainer.classList.add(searchResult_styles.favorited);
        favoriteArr.push(id);
      } else if (starIconColor === "#EDD943") {
        starIcon.setAttribute("color", "#D8D8D8");
        resultContainer.classList.remove(searchResult_styles.favorited);
        removeFavoriteItem(id, favoriteArr);
      }
    } else if (className === favlist_styles.FavoriteList__container) {
      resultContainer.classList.remove(searchResult_styles.favorited);
      removeFavoriteItem(id, favoriteArr);
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
        <SearchResults
          matchedData={this.state.matchedData}
          starColor={this.handleStarColor}
          starClicked={this.handleStarClick}
          data={this.state.data}
        />
      );
    } else if (this.state.searched) {
      results = <div>no result</div>;
    }
    return (
      <div className={app_styles.App}>
        <Header
          favoritedData={this.state.favoritedData}
          starClicked={this.handleStarClick}
          starColor={this.handleStarColor}
          data={this.state.data}
        />
        <div className={app_styles.SearchSection__container}>
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
      </div>
    );
  }
}

export default App;
