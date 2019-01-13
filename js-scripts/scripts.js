
let numberOfPosts = 0;
let dataSet = '';


const Url = 'https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000';

fetch(Url)
.then(res => {
   return res.json()
})
.then(data => {

  numberOfPosts = data.length;

  data = data.map(function(post){
    let title = document.createElement('textarea');
    let body = document.createElement('textarea');

    title.innerHTML += post.title;
    body.innerHTML += post.body;

    post.keywords = post.keywords.split(", ").join(" ");

    // console.log(post.keywords)
    console.log({title: title.value, body: body.value, keywords: post.keywords})
    return {title: title.value, body: body.value, keywords: post.keywords};
  })

  postHiddenData(data)
  dataSet = data;

  //post all data hidden
  // Post(data)
  // pushKeywordToArray();
  // console.log(dataSet)

  //show data which contains userinput


  $('#getPosts').click(function(){
    search(getUserQuery())
      // Post(data);
      // getUserInputValue();
      // storeMatchedPost(pushKeywordToArray, getUserInputValue)
  })

  $('#getPosts').keydown(function(event){
    if (event.keyCode === 13){
      getUserQuery()
      // Post(data);
      // getUserInputValue();
    }
  })


})
.catch(error => console.log(error))



function postHiddenData (data) {
  let index = 0;
  let output = '';

  //console.log(data[0].keywords)
  // let container = $("div[id*="+ index +"]").data("keywords");
  data.forEach((element) => {
    // data[index].keywords.split(",")
    // childArr = $container.split(", ");

    output += `
      <div style="display:none" class="container keyword" data-keywords="${element.keywords}" id="${index}">
        <div class="row">
        <div class="col title">${element.title}</div>
        <div class="col">${element.body}</div>
        </div>
      </div>
    `;

    index++;
    //console.log(element.keywords);
  });

  $('#output').html(output);
}


const getUserQuery = () => {
  let userInput = $('#userInput').val().toLowerCase().split(" ");
  let uniqueUserInput = [...new Set(userInput)];
  //console.log(uniqueUserInput)
  return uniqueUserInput;
}

const search = (query) => {
  let resultArr = [];
  let title = $("div[class*='title']");
  let keyword = $()
  //console.log(titleText.eq(0).closest("div[class*='keyword']").html())
  //console.log(titleText.eq(2).closest("div:has([class*='keyword'])").attr('id'))
  for (let arrIndex in query){
    //console.log(arrIndex)
    let eachQuery = query[arrIndex];
    let eachQueryInReg = new RegExp(eachQuery,"g");
    console.log(eachQueryInReg)
    for (let dataIndex in dataSet){
      //console.log(titleText.eq(index).text());
      console.log(title.eq(dataIndex).text())
      if (title.eq(dataIndex).text().toLowerCase().match(eachQueryInReg) !== null){

        console.log('same title text found!')
        resultArr.push(dataIndex);
         console.log(resultArr);
      }
      // if ()
    }
  }

}

function pushKeywordToArray () {
  let parentArr = [];
  let childArr = [];

  for (let index in dataSet) {
      let $container = $("div[id*="+ index +"]").data("keywords");
      childArr = $container.split(", ");
      parentArr.push(childArr)
  }
  //return two dimentional array with all keyword for each html element
  console.log(parentArr)
  return parentArr;
}


function isMatchingKeyword () {
  let matchedElement = [];
  for (let index in dataSet) {
    let keywords = parentArr[index].length
    //console.log(keywords)
    for (let i = 0; i <= keywords; i++){
      if (userInput === parentArr[index][i]){
        matchedElement.push(index)
        //console.log('same')
      } else {
        //console.log('not same')
      }
    }
    //console.log(matchedElement[0])
  }
  //
  // $("div[id*="+ matchedElement[0] +"]").css("display", "unset");
}




function pushMatchedTitleToArray () {

}

function pushTitleToArray () {

}


// function Search () {
//   let arr = [];
//   for (let index in dataSet) {
//       let $container = $("div[id*="+ index +"]").data("keywords");
//       console.log($container)
//       arr = $container.split(" ");
//       console.log(arr)
//       // return arr;
//   }
// }


// questions:
// why array is automatically empty after first itiration
// issue:
//get rid of comma inside array
