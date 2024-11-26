// Function to add speed buttons
function addSpeedButtons() {
  const controlsContainer = document.querySelector('.ytp-left-controls');
  if (!controlsContainer || document.getElementById('speedy-buttons')) return;

  // Create a container for the buttons
  const buttonContainer = document.createElement('div');
  buttonContainer.id = 'speedy-buttons';

  // Playback speeds (including 1.25x)
  const speeds = [0.5, 1, 1.25, 1.5, 2, 2.5, 3];

  speeds.forEach((speed) => {
    const button = document.createElement('button');
    button.innerText = `${speed}x`;
    button.classList.add('speedy-button');

    // Set the underline for the active speed button
    const updateActiveButton = () => {
      const video = document.querySelector('video');
      if (video && video.playbackRate === speed) {
        button.classList.add('active-speed');
      } else {
        button.classList.remove('active-speed');
      }
    };

    // Set the playback speed on button click
    button.onclick = () => {
      const video = document.querySelector('video');
      if (video) {
        video.playbackRate = speed;
        updateAllButtons();
      }
    };

    // Append button to the container
    buttonContainer.appendChild(button);

    // Update the button's style when the video speed changes
    const video = document.querySelector('video');
    if (video) {
      video.addEventListener('ratechange', updateActiveButton);
    }
  });

  // Function to update all buttons' active states
  const updateAllButtons = () => {
    document.querySelectorAll('.speedy-button').forEach((btn) => {
      btn.classList.remove('active-speed');
    });
    speeds.forEach((speed) => {
      const video = document.querySelector('video');
      if (video && video.playbackRate === speed) {
        const activeButton = Array.from(buttonContainer.children).find(
          (btn) => btn.innerText === `${speed}x`
        );
        if (activeButton) activeButton.classList.add('active-speed');
      }
    });
  };

  // Append the container to YouTube's video controls
  controlsContainer.parentNode.insertBefore(buttonContainer, controlsContainer.nextSibling);

  // Update buttons initially
  updateAllButtons();
}

// Observe changes to dynamically load buttons on navigation
const observer = new MutationObserver(addSpeedButtons);
observer.observe(document.body, {
  childList: true,
  subtree: true,
});
