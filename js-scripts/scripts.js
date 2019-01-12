
let numberOfPosts = 0;
// let dataSet;

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

  // dataSet = data;

  $('#getPosts').click(function(){
      Post(data);
      getUserInputValue();
  })

  $('#getPosts').keydown(function(event){
    if (event.keyCode === 13){
      Post(data);
      getUserInputValue();
    }
  })


   Search(data);
   // console.log(data[0]['keywords'])
   // console.log(data[0])
})
.catch(error => console.log(error))


function getUserInputValue () {
  let userInput = $('#userInput').val()
  return userInput;
}


function Post (data) {

  let output = '';
  data.forEach(function(element){
    output += `
      <div class="container post" data-keywords="${element.keywords}">
        <div class="row">
        <div class="col">${element.title}</div>
        <div class="col">${element.body}</div>
        </div>
      </div>
    `;
  });
  $('#output').html(output);
  return data;
}

function Search (dataSets) {

    for (let index in dataSets){
      console.log('index: ' + index)
        for (let dataSet of dataSets){
          console.log(dataSet)
        }
    }
}

function getKeyWordArray (ArrayOfObject) {
    for (let index in ArrayOfObject){
      ArrayOfObject[index]['keywords']
    }
}
