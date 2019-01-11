// let request = new XMLHttpRequest();
//
// request.open('GET', 'https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000', true);
// request.onload = function () {
//
//   let data = JSON.parse(this.response);
//   if (request.status >= 200 && request.status < 400) {
//     //data.forEach()
//     console.log(data)
//   }
// }
//
// request.send();
let numberOfPosts = 0;


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
     console.log({title: title.value, body: body.value, keywords: post.keywords}.length);
    return {title: title.value, body: body.value, keywords: post.keywords};
  })

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
  //
  // $(document).on('ready', function(){
  //   numberOfPosts = $("div[class*='post']").length;
  // })

  Search(data);


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

function Search (data) {

    for (let i = 0; i < numberOfPosts + 1; i++){
        console.log(data + 'index: ' + i)
    }
}
