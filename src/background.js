'use strict';
import { Readability } from '@mozilla/readability'
import DOMPurify from 'dompurify';

function readable(doc) {
  const reader = new Readability(doc)
  const article = reader.parse()
  return article
}

var documentClone = document.cloneNode(true);
var article = new Readability(documentClone).parse();



// // With background scripts you can communicate with popup
// // and contentScript files.
// // For more information on background script,
// // See https://developer.chrome.com/extensions/background_pages

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.type === 'GREETINGS') {
//     const message = `Hi ${
//       sender.tab ? 'Con' : 'Pop'
//     }, my name is Bac. I am from Background. It's great to hear from you.`;

//     // Log message coming from the `request` parameter
//     console.log(request.payload.message);
//     // Send a response message
//     sendResponse({
//       message,
//     });
//   }
// });
