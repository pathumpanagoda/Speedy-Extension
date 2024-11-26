chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // Check if the tab's URL includes YouTube and the status is "complete"
    if (changeInfo.status === "complete" && tab.url.includes("youtube.com/watch")) {
      // Inject the content script dynamically into the tab
      chrome.scripting.executeScript({
        target: { tabId },
        files: ["content.js"],
      });
      chrome.scripting.insertCSS({
        target: { tabId },
        files: ["styles.css"],
      });
    }
  });
  