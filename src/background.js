'use strict';

require('dotenv').config();

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.type === 'send_article_to_background') {

    let trimmed = request.payload.message

    console.log(`trimmed in background.js`, trimmed);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.AUTHORIZATION_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            "role": "user",
            "content": `can you summarize this text: ${trimmed}`
          }
        ]
      })
    })

    if (response.ok) {
      const data = await response.json();
      let articleContent = data.choices[0].message.content
      console.log(`fetch request data in background script***********************`, articleContent);

      chrome.runtime.sendMessage({
        "action": "sendDataToPopup.js",
        "result": articleContent
      });

      return articleContent
    }
    else {
      return 'Article not received#########################'
    }
  }
});
