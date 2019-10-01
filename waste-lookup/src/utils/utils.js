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

export function filterHTMLEntity(body) {
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

export function removeFavoriteItem(id, arr) {
  let index = arr.indexOf(id);
  if (index > -1) {
    arr.splice(index, 1);
  }
}

export function createObjectArr(index, score) {
  let obj = {};
  obj[index] = score;
  return obj;
}

export function exactMatch(query, sentence) {
  let charRegex = /^[a-z]|[-]+$/;
  let negationRegex = /(^not|^non)+/g;
  let nonRegex = /(^non-)+/g;
  let spaceRegex = /\s/g;
  let splitQueryArr = [];
  let lowerCaseQ = query.toLowerCase();
  let lowerCaseS = sentence.toLowerCase();
  let counter = 0;
  let totalCount = 0;

  if (!nonRegex.test(lowerCaseQ)) {
    if (negationRegex.test(lowerCaseQ)) {
      let replacedQuery = lowerCaseQ.replace(negationRegex, "non-");
      if (spaceRegex.test(replacedQuery)) {
        lowerCaseQ = replacedQuery.replace(/\s/g, "");
      } else {
        lowerCaseQ = replacedQuery;
      }
    }
  }

  if (spaceRegex.test(lowerCaseQ)) {
    splitQueryArr.push(...lowerCaseQ.split(" "));
  } else {
    splitQueryArr.push(lowerCaseQ);
  }

  for (let h = 0, l = splitQueryArr.length; h < l; h++) {
    counter = 0;
    for (let i = 0, n = sentence.length; i < n; i++) {
      let includeQuery = false;

      if (splitQueryArr[h].charAt(0) === lowerCaseS.charAt(i)) {
        for (let j = 1, m = splitQueryArr[h].length; j < m; j++) {
          if (splitQueryArr[h].charAt(j) !== lowerCaseS.charAt(i + j)) {
            includeQuery = false;
            break;
          } else {
            includeQuery = true;
          }
        }
      }
      if (includeQuery) {
        if (!charRegex.test(lowerCaseS.charAt(i - 1)) && !charRegex.test(lowerCaseS.charAt(i + splitQueryArr[h].length))) {
          counter = counter + 1;
        }
      }
    }
    totalCount = totalCount + counter;
  }

  return totalCount;
}

export function addPrefix(query, sentence) {
  let charRegex = /^[a-z]|[-]+$/;
  let negationRegex = /(^not|^non)+/g;
  let pluralRegex = /(sh$|s$|x$|ch$)+/g;
  let YconsonantRegex = /y$/g;
  let OconsonantRegex = /o$/g;
  let vowelRegex = /[aeiou]$/g;
  let notVowelRegex = /[^aeiou]/g;
  let FconsonantRegex = /f$/g;
  let spaceRegex = /\s/g;
  let splitQueryArr = [];
  let lowerCaseQ = query.toLowerCase();
  let lowerCaseS = sentence.toLowerCase();
  let counter = 0;
  let totalCount = 0;
  let queryLength = lowerCaseQ.length;

  if (negationRegex.test(lowerCaseQ)) {
    return;
  } else if (pluralRegex.test(lowerCaseQ)) {
    let customGeneratedQuery = lowerCaseQ.concat("es");
    lowerCaseQ = customGeneratedQuery;
  } else if (lowerCaseQ.charAt(queryLength - 3) === lowerCaseQ.charAt(queryLength - 2) && YconsonantRegex.test(lowerCaseQ)) {
    let customGeneratedQuery = lowerCaseQ.replace("y", "");
    customGeneratedQuery = customGeneratedQuery.concat("ies");
    lowerCaseQ = customGeneratedQuery;
  } else if (vowelRegex.test(lowerCaseQ.charAt(queryLength - 2)) && YconsonantRegex.test(lowerCaseQ)) {
    let customGeneratedQuery = lowerCaseQ.concat("s");
    lowerCaseQ = customGeneratedQuery;
  } else if (vowelRegex.test(lowerCaseQ.charAt(queryLength - 2)) && OconsonantRegex.test(lowerCaseQ)) {
    let customGeneratedQuery = lowerCaseQ.concat("s");
    lowerCaseQ = customGeneratedQuery;
  } else if (notVowelRegex.test(lowerCaseQ.charAt(queryLength - 2)) && OconsonantRegex.test(lowerCaseQ)) {
    let customGeneratedQueryOne = lowerCaseQ.concat("s");
    let customGeneratedQueryTwo = lowerCaseQ.concat("es");
    let customGeneratedQueryThree = [];
    customGeneratedQueryThree.push(customGeneratedQueryOne, customGeneratedQueryTwo);
    lowerCaseQ = customGeneratedQueryThree;
  } else if (
    FconsonantRegex.test(lowerCaseQ) ||
    (FconsonantRegex.test(lowerCaseQ.charAt(queryLength - 2)) && vowelRegex.test(lowerCaseQ))
  ) {
    let customGeneratedQuery = lowerCaseQ.replace(vowelRegex, "");
    customGeneratedQuery = customGeneratedQuery.replace(FconsonantRegex, "");
    customGeneratedQuery = customGeneratedQuery.concat("ves");
    lowerCaseQ = customGeneratedQuery;
  } else {
    let customGeneratedQuery = lowerCaseQ.concat("s");
    lowerCaseQ = customGeneratedQuery;
  }

  if (lowerCaseQ.constructor === Array) {
    let queryArr = [];
    for (let i = 0, n = lowerCaseQ.length; i < n; i++) {
      queryArr.push(lowerCaseQ[i]);
    }
    for (let j = 0, m = queryArr.length; j < m; j++) {
      splitQueryArr.push(queryArr[j]);
      splitQueryArr.push(...queryArr[j].split(" "));
    }
    splitQueryArr = splitQueryArr.filter(function checkUniqueItem(item, index) {
      return splitQueryArr.indexOf(item) === index;
    });
  } else if (spaceRegex.test(lowerCaseQ)) {
    splitQueryArr.push(...lowerCaseQ.split(" "));
  } else {
    splitQueryArr.push(lowerCaseQ);
  }

  for (let h = 0, l = splitQueryArr.length; h < l; h++) {
    counter = 0;
    for (let i = 0, n = sentence.length; i < n; i++) {
      let includeQuery = false;

      if (splitQueryArr[h].charAt(0) === lowerCaseS.charAt(i)) {
        for (let j = 1, m = splitQueryArr[h].length; j < m; j++) {
          if (splitQueryArr[h].charAt(j) !== lowerCaseS.charAt(i + j)) {
            includeQuery = false;
            break;
          } else {
            includeQuery = true;
          }
        }
      }
      if (includeQuery) {
        if (!charRegex.test(lowerCaseS.charAt(i - 1)) && !charRegex.test(lowerCaseS.charAt(i + splitQueryArr[h].length))) {
          counter = counter + 1;
        }
      }
    }
    totalCount = totalCount + counter;
  }

  return totalCount;
}
