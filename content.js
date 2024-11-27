function addSpeedButtons() {
  const controlsContainer = document.querySelector('.ytp-left-controls');
  if (!controlsContainer || document.getElementById('speedy-buttons')) return;

  const buttonContainer = document.createElement('div');
  buttonContainer.id = 'speedy-buttons';

  const speeds = [0.5, 1, 1.25, 1.5, 2, 2.5, 3];

  const updateActiveButton = () => {
    const video = document.querySelector('video');
    if (video) {
      document.querySelectorAll('.speedy-button').forEach((btn) => {
        const speed = parseFloat(btn.innerText);
        btn.classList.toggle('active-speed', video.playbackRate === speed);
      });
    }
  };

  speeds.forEach((speed) => {
    const button = document.createElement('button');
    button.innerText = `${speed}x`;
    button.classList.add('speedy-button');
    button.onclick = () => {
      const video = document.querySelector('video');
      if (video) {
        video.playbackRate = speed;
        updateActiveButton();
      }
    };
    buttonContainer.appendChild(button);
  });

  controlsContainer.parentNode.insertBefore(buttonContainer, controlsContainer.nextSibling);

  const video = document.querySelector('video');
  if (video) {
    video.addEventListener('ratechange', updateActiveButton);
  }

  updateActiveButton();
}

chrome.storage.sync.get(['disabledSites'], (data) => {
  const disabledSites = data.disabledSites || [];
  const currentUrl = new URL(window.location.href).hostname;

  if (!disabledSites.includes(currentUrl)) {
    addSpeedButtons();
  }
});
