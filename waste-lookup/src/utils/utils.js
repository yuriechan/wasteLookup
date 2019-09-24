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
  return arr.sort(function(a, b) {
    return Object.values(b) - Object.values(a);
  });
}
