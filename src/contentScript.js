import { Readability } from '@mozilla/readability'
import DOMPurify from 'dompurify';


function getData() {

  let documentClone = document.cloneNode(true);
  let article = new Readability(documentClone).parse();
  let trimmed = '' + article.textContent.replace(/ +(?= )/g, '').replace(/(\r\n|\n|\r)/gm, "");
  console.log(trimmed)

  return trimmed

}


let articleText = getData()
console.log(`article text below getData function`, articleText)

// Save the article text to local storage
chrome.storage.local.set({ "articleText": articleText }, function () {
  console.log('Article text saved to local storage');
});
