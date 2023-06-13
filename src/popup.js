async function getCurrentTab() {
  const queryOptions = { active: true, lastFocusedWindow: true };
  const [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById('summarizeContentButton').addEventListener('click', extractData);
});


async function extractData() {
  chrome.storage.local.get('articleText', function (data) {
    let articleText = data.articleText;
    console.log(`Retrieved article text from local storage: ${articleText}`);

    chrome.runtime.sendMessage(
      {
        type: 'send_article_to_background',
        payload: {
          message: articleText,
        },
      },
      (response) => {
        console.log(response.message);
      }
    );

  });


}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "sendDataToPopup.js") {
    console.log(`Message received in popup.js: ${request.result}`);
    navigator.clipboard.writeText(request.result);
    const articleSummaryElement = document.querySelector('#articleSummary');
    articleSummaryElement.innerText = request.result;
  }
});
