export function decodeHtmlEntity(html) {
  let txt = document.createElement("textarea");
  txt.innerHTML = html;
  return { __html: txt.value };
}

export function filterUserInput(query) {
  let lowerCaseQuery = query.toLowerCase();
  let lengthOfQuery = lowerCaseQuery.length;
  while (lowerCaseQuery.charAt(lengthOfQuery - 1) === " ") {
    lowerCaseQuery = lowerCaseQuery.slice(0, lengthOfQuery - 1);
    lengthOfQuery = lowerCaseQuery.length;
  }
  return [lowerCaseQuery, lengthOfQuery];
}

export function filterHTMLEntitity(body) {
  let txt = document.createElement("textarea");
  txt.innerHTML = body;
  let decodedBody = txt.value;
  let bodyText = decodedBody
    .replace(/<[^<>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .toLowerCase();
  return bodyText;
}

export function orderByDescending(arr) {
  let orderedArr = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    if (!orderedArr.length) {
      orderedArr.push(arr[i]);
    } else {
      for (let j = 0, m = orderedArr.length; j < m; j++) {
        if (arr[i][Object.keys(arr[i])] > orderedArr[j][Object.keys(orderedArr[j])]) {
          if (j + 1 === m) {
            orderedArr.splice(0, 0, arr[i]);
          } else {
            continue;
          }
        } else if (arr[i][Object.keys(arr[i])] === orderedArr[j][Object.keys(orderedArr[j])]) {
          orderedArr.splice(j, 0, arr[i]);
          break;
        } else {
          if (j + 1 === m) {
            orderedArr.splice(m, 0, arr[i]);
          } else {
            continue;
          }
        }
      }
    }
  }
  return orderedArr;
}
