
document.getElementById("apply").addEventListener("click", () => {
  const speed = document.getElementById("speed").value;

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: setPlaybackSpeed,
      args: [speed],
    });
  });
});

function setPlaybackSpeed(speed) {
  const video = document.querySelector("video");
  if (video) {
    video.playbackRate = parseFloat(speed);
  } else {
    alert("No video found on this page.");
  }
}
