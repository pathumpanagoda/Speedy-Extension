chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url.includes('youtube.com/watch')) {
    const currentUrl = new URL(tab.url).hostname;

    chrome.storage.sync.get(['disabledSites'], (data) => {
      const disabledSites = data.disabledSites || [];
      if (!disabledSites.includes(currentUrl)) {
        chrome.scripting.executeScript({
          target: { tabId },
          files: ['content.js'],
        });
        chrome.scripting.insertCSS({
          target: { tabId },
          files: ['styles.css'],
        });
      }
    });
  }
});
