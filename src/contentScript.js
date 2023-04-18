import { Readability } from '@mozilla/readability'
import DOMPurify from 'dompurify';
const { Configuration, OpenAIApi } = require("openai");
// const fetch = require('node-fetch');

async function getData() {

  let documentClone = document.cloneNode(true);
  let article = new Readability(documentClone).parse();
  let trimmed = '' + article.textContent.replace(/ +(?= )/g, '').replace(/(\r\n|\n|\r)/gm, "");
  console.log(trimmed)

  // set up message prompts

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
      'Authorization': 'Bearer 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'
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "system",
          "content": "You are a helpful assistant. I will give you an article to summarize and you will give me a list of the key takeaways from the article followed by a summary that adequately explains the main points, arguments, and facts from the article."
        },
        {
          "role": "user",
          "content": `can you summarize this article: ${trimmed}`
        }
      ]
    })
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));

  console.log(response)


  return True;
}

chrome.runtime.sendMessage({
  "action": "sendDataToPopup.js",
  "result": getData()
});









  // const messages = [
  //   {
  //     "role": "system",
  //     "content": "You are a helpful assistant. I will ask you to summarize an article and you will give me a list of the key takeaways from the article followed by a summary that adequately explains the main points, arguments, and facts from the article."
  //   },
  //   {
  //     "role": "user",
  //     "content": trimmed
  //   }
  // ];

  // const configuration = new Configuration({
  //   apiKey: "sk - AudBJZEk4wE2ET5z3uCWT3BlbkFJ2yoYzEUkBRPzw30RfsIO",
  // });
  // const openai = new OpenAIApi(configuration);

  // const completion = await openai.createChatCompletion({
  //   model: "gpt-3.5-turbo",
  //   messages: messages,
  // });
  // console.log(completion.data.choices[0].message);


// 'use strict';

// // Content script file will run in the context of web page.
// // With content script you can manipulate the web pages using
// // Document Object Model (DOM).
// // You can also pass information to the parent extension.

// // We execute this script by making an entry in manifest.json file
// // under `content_scripts` property

// // For more information on Content Scripts,
// // See https://developer.chrome.com/extensions/content_scripts

// // Log `title` of current active web page
// const pageTitle = document.head.getElementsByTagName('title')[0].innerHTML;
// console.log(
//   `Page title is: '${pageTitle}' - evaluated by Chrome extension's 'contentScript.js' file`
// );

// // Communicate with background file by sending a message
// chrome.runtime.sendMessage(
//   {
//     type: 'GREETINGS',
//     payload: {
//       message: 'Hello, my name is Con. I am from ContentScript.',
//     },
//   },
//   (response) => {
//     console.log(response.message);
//   }
// );

// // Listen for message
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.type === 'COUNT') {
//     console.log(`Current count is ${request.payload.count}`);
//   }

//   // Send an empty response
//   // See https://github.com/mozilla/webextension-polyfill/issues/130#issuecomment-531531890
//   sendResponse({});
//   return true;
// });
