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



const Url = 'https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000';

fetch(Url)
.then(res => {
  return res.json()
})
.then(data => {
  //let cleanData = $.parseHTML(data);
  console.log(data)
  $('#getPosts').on('click', Post(data));
})
.catch(error => console.log(error))


function Post (data) {
  let output = '<h2>Posts</h2>';
  data.forEach(function(post){
    output += `
      <div>
        <h3>${post.title}</h3>
        <p>${post.body}</p>
      </div>
    `;
  });
  document.getElementById('output').innerHTML = output;
}

// $(document).on('load', function(){
// console.log('hi')
//
//   document.getElementById('getPosts').addEventListener('click', getPosts);
//     console.log('test')
//   function getPosts () {
//     console.log('test')
//     fetch('https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000')
//     .then((res) => res.json())
//     .then((data) => {
//       let output = '<h2>Posts</h2>';
//       data.forEach(function(post){
//         output += `
//           <div>
//             <h3>${post.title}</h3>
//             <p>${post.body}</p>
//           </div>
//         `;
//       });
//       document.getElementById('output').innerHTML = output;
//     })
//   }
//
// })
