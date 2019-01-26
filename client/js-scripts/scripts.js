const Url = 'https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000';
let numberOfPosts = 0;
let dataSet = '';
let favIdArr = [];

fetch(Url)
  .then(res => {
    return res.json();
  })
  .then(data => {

    numberOfPosts = data.length;

    data = data.map((post) => {
      let title = document.createElement('textarea');
      let body = document.createElement('textarea');

      title.innerHTML += post.title;
      body.innerHTML += post.body;
      post.keywords = post.keywords.split(",").join(" ");

      return {
        title: title.value,
        body: body.value,
        keywords: post.keywords
      };
    })

    postHiddenData(data);
    dataSet = data;

    $('#getPosts').click(() => {
      resetFocus();
      hideAllPost();
      renderResults(search(getUserQuery()));
    })

    // $(document).on('click touchstart', "#getPosts", function () {
    //   resetFocus();
    //   hideAllPost();
    //   renderResults(search(getUserQuery()));
    // })

    $('#userInput').keydown((event) => {
      if (event.keyCode === 13) {
        resetFocus();
        hideAllPost();
        renderResults(search(getUserQuery()));
      }
    })

    $(document).on('click', "div[data-id]", function() {
      changeToGrayStar($(this));
    })


    $(document).on('click', "i[class*=fa-star]", function() {
      changeToGreenStar($(this));
    })

    $(document).on('click', "i[class*=fa-minus]", function() {
      moveFavList();
    })

  })
  .catch(error => console.log(error));



const postHiddenData = (data) => {
  let index = 0;
  let output = '';

  data.forEach((element) => {

    output += `
      <div style="display:none" class="container-fluid keyword m-4" data-keywords="${element.keywords}" id="${index}">
        <div class="row">
        <div class="col-12 col-sm-12 col-md-12 col-lg mb-3 title"><i class="fas fa-star fa-lg mr-3"></i>${element.title}</div>
        <div class="col-12 col-sm-12 col-md-12 col-lg">${element.body}</div>
        </div>
      </div>
    `;

    index++;
  });

  $('#output').html(output);
}


const getUserQuery = () => {
  let userInput = $('#userInput').val().toLowerCase().split(" ");

  if (userInput == "") {
    return false;
  } else {
    let uniqueUserInput = [...new Set(userInput)];
    return uniqueUserInput;
  }
}

const search = (query) => {
  let allResultsArr = [];
  let title = $("div[class*='title']");
  let keyword = $("div[class*='keyword']");

  for (let arrIndex in query) {

    let eachQuery = query[arrIndex];
    let eachQueryInReg = new RegExp(eachQuery, "g");
    for (let dataIndex in dataSet) {

      if (title.eq(dataIndex).text().toLowerCase().match(eachQueryInReg) !== null) {
        allResultsArr.push(dataIndex);
      }

      if (keyword.eq(dataIndex).data("keywords").match(eachQueryInReg) !== null) {
        allResultsArr.push(dataIndex);
      }
    }
  }

  let uniqueResultsArr = [...new Set(allResultsArr)];
  return uniqueResultsArr;
}


const renderResults = (arr) => {
  for (let index in arr) {
    $("div[id=" + arr[index] + "]").removeAttr("style");
  }
}

const resetFocus = () => {
  $('#userInput').focus();
}

const hideAllPost = () => {
  $('#output').children('div').each(function(index, obj) {
    if (!$(this).is('[style]')) {
      $(this).css("display", "none");
    }
  })
}

const changeToGreenStar = (obj) => {
  let clone;
  let id;
  if (!obj.hasClass("clicked")) {
    obj.addClass("clicked");
    clone = obj.parents().eq(2).clone();
    clone.find("i").attr('id', 'favorite-list');

    id = clone.attr("id");
    clone.removeAttr("id");
    clone.attr("data-id", id);

    $('#favorite-lists').prepend(clone);
  }
  return id;
}

const changeToGrayStar = (obj) => {
  let id;
  if (obj.find("#favorite-list")) {
    id = obj.attr("data-id");
    $("div[id=" + id + "]").find("i").removeClass("clicked");
    obj.remove();
  }
  return id;
}

const moveFavList = () => {
  $('#favorites-container').toggleClass("expand");
}
