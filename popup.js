const disableToggle = document.getElementById('disable-toggle');
const toggleLabel = document.getElementById('toggle-label');

// Get the current tab's hostname
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const currentUrl = new URL(tabs[0].url).hostname;

  // Fetch stored disabled sites
  chrome.storage.sync.get(['disabledSites'], (data) => {
    const disabledSites = data.disabledSites || [];
    const isEnabled = !disabledSites.includes(currentUrl);

    disableToggle.checked = isEnabled;
    toggleLabel.textContent = isEnabled ? 'Disable on this site' : 'Enable on this site';
  });
});

// Handle toggle change
disableToggle.addEventListener('change', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentUrl = new URL(tabs[0].url).hostname;

    chrome.storage.sync.get(['disabledSites'], (data) => {
      let disabledSites = data.disabledSites || [];

      if (disableToggle.checked) {
        // Remove site from disabled list (Enable extension)
        disabledSites = disabledSites.filter((site) => site !== currentUrl);
        toggleLabel.textContent = 'Disable on this site';
      } else {
        // Add site to disabled list (Disable extension)
        if (!disabledSites.includes(currentUrl)) {
          disabledSites.push(currentUrl);
        }
        toggleLabel.textContent = 'Enable on this site';
      }

      // Save updated list and refresh the tab
      chrome.storage.sync.set({ disabledSites }, () => {
        console.log(`Updated disabled sites: ${disabledSites}`);
        chrome.tabs.reload(tabs[0].id); // Refresh the current tab
      });
    });
  });
});
