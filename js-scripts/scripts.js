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
  // let json = res.json();
  // return json.replace(/&nbsp;/g, '');

})
.then(data => {

  //console.log(data)
  //console.log($.parseHTML(data))
  //let test = JSON.stringify(data)
  //$(document).on('click','#getPosts', Post(data));
  //$('#getPosts').onclick = Post(data);

  //console.log(text)
  $('#getPosts').click(function(){
    let text = htmlDecode(data);

    Post(text)
  })


})
.catch(error => console.log(error))


function Post (data) {
  //let test = '<ul> <li>Place item in the <strong>Garbage Bin.</strong></li> </ul>'
  //let test = '&lt;ul&gt; &lt;li&gt;Place item in the &lt;strong&gt;Garbage Bin.&lt;/strong&gt;&lt;/li&gt; &lt;/ul&gt;'
  console.log(data)
  let output = '<h2>Posts</h2>';
  data.forEach(function(post){
    output += `
      <div>
        <h3>${post.title}</h3>
        <p>${post.body}<p>
      </div>
    `;
  });
   $('#output').html(output).text();
  // $('<h2 />').html(output).text();
}

// let decodeEntities = (function(){
//   let element = document.createElement('div');
//
//   function decodeHTMLEntities (str) {
//     if (str && typeof str === 'string') {
//       str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
//       str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
//       element.innerHTML = str;
//       str = element.textContent;
//       element.textContent = '';
//     }
//     return str;
//   }
//   return decodeHTMLEntities;
// })();

function convertHTML(str) {
  // &colon;&rpar;

  if (str.indexOf("&") != -1) {
    str=str.replace(/&/g, "&amp;");
  }

  if (str.indexOf("<") != -1) {
    str=str.replace(/</g, "&lt;");
  }

  if (str.indexOf(">") != -1) {
    str=str.replace(/>/g, "&gt;");
  }

  if (str.indexOf('"') != -1) {
    str=str.replace(/"/g, "&quot;");
  }

  if (str.indexOf("'") != -1) {
    str=str.replace(/'/g, "&apos;");
  }

  return str;
}﻿

function htmlDecode(input){
  var e = document.createElement('div');
  e.innerHTML = input;
  // handle case of empty input
  return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}




// function replaceNbsps (data) {
//   return data.toString().replace(/&nbsp;/g, '');
// }
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
