import { Readability } from '@mozilla/readability'
import DOMPurify from 'dompurify';
const { Configuration, OpenAIApi } = require("openai");
// const fetch = require('node-fetch');


async function getData() {
  try {
    let documentClone = document.cloneNode(true);
    let article = new Readability(documentClone).parse();
    let trimmed = '' + article.textContent.replace(/ +(?= )/g, '').replace(/(\r\n|\n|\r)/gm, "");

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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

    if (response.ok) {
      const data = await response.json();
      console.log(data?.choices?.[0]?.message?.content);
      return true;
    } else {
      console.log(`Error ${response.status}: ${response.statusText}`);
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

chrome.runtime.sendMessage({
  "action": "sendDataToPopup.js",
  "result": getData()
});



// async function getData() {

//   let documentClone = document.cloneNode(true);
//   let article = new Readability(documentClone).parse();
//   let trimmed = '' + article.textContent.replace(/ +(?= )/g, '').replace(/(\r\n|\n|\r)/gm, "");
//   console.log(trimmed)

//   // set up message prompts

//   const response = await fetch('https://api.openai.com/v1/chat/completions', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': 'Bearer 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'
//     },
//     body: JSON.stringify({
//       model: "gpt-3.5-turbo",
//       messages: [
//         {
//           "role": "system",
//           "content": "You are a helpful assistant. I will give you an article to summarize and you will give me a list of the key takeaways from the article followed by a summary that adequately explains the main points, arguments, and facts from the article."
//         },
//         {
//           "role": "user",
//           "content": `can you summarize this article: ${trimmed}`
//         }
//       ]
//     })
//   })
//     .then(response => response.json())
//     .then(data => data?.choices?.[0]?.message?.content)
//     .catch(error => console.error(error));
//   return response
// }
