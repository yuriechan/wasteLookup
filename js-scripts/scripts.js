
let numberOfPosts = 0;
let dataSet = '';


const Url = 'https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000';

fetch(Url)
.then(res => {
   return res.json()
})
.then(data => {
  // console.log(data)
  numberOfPosts = data.length;

  data = data.map(function(post){
    let title = document.createElement('textarea');
    let body = document.createElement('textarea');
    title.innerHTML += post.title;
    body.innerHTML += post.body;

    return {title: title.value, body: body.value, keywords: post.keywords};
  })
  dataSet = data;
  Post(data);


  $('#getPosts').click(function(){
      // Post(data);
      getUserInputValue();
  })

  $('#getPosts').keydown(function(event){
    if (event.keyCode === 13){
      // Post(data);
      getUserInputValue();
    }
  })

  pushKeywordToArray();
   // Search();
   // console.log(data[0]['keywords'])
   // console.log(data[0])
})
.catch(error => console.log(error))


function getUserInputValue () {
  let userInput = $('#userInput').val()
  return userInput;
}


function Post (data) {
  let index = 0;
  let output = '';
  data.forEach(function(element){

    output += `
      <div style="display:none" class="container post" data-keywords="${element.keywords}" id="${index}">
        <div class="row">
        <div class="col">${element.title}</div>
        <div class="col">${element.body}</div>
        </div>
      </div>
    `;

    index++;
  });

  $('#output').html(output);
  return data;
}

function Search (userInput) {
  let arr = [];
  for (let index in dataSet) {
      let $container = $("div[id*="+ index +"]").data("keywords");
      console.log($container)
      arr = $container.split(" ");
      console.log(arr)
      // return arr;
  }



}

function pushKeywordToArray () {
  let parentArr = [];
  let childArr = [];
  for (let index in dataSet) {
      let $container = $("div[id*="+ index +"]").data("keywords");
      //console.log($container)
      childArr = $container.split(", ");
      parentArr.push(childArr)
      //console.log(childArr)
      console.log(parentArr[0])
      return parentArr;
  }
  // console.log(arr[1])
}

// function searchMatchingPost (userInput, arr) {
//   for (let )
// }


function storeMatchedPost (twoDimentionalArr, userInput) {
  let matchedElement = [];
  for (let index in dataSets){
    if (userInput == twoDimentionalArr[index]){

    }
  }

}

// questions:
// why array is automatically empty after first itiration
// issue:
//get rid of comma inside array
