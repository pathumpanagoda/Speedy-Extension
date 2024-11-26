// Function to add speed buttons
function addSpeedButtons() {
  const controlsContainer = document.querySelector('.ytp-left-controls');
  if (!controlsContainer || document.getElementById('speedy-buttons')) return;

  // Create a container for the buttons
  const buttonContainer = document.createElement('div');
  buttonContainer.id = 'speedy-buttons';

  // Playback speeds (including 1.25x)
  const speeds = [0.5, 1, 1.25, 1.5, 2, 2.5, 3];

  // Function to set active button style
  const updateActiveButton = () => {
    const video = document.querySelector('video');
    if (video) {
      document.querySelectorAll('.speedy-button').forEach((btn) => {
        const speed = parseFloat(btn.innerText); // Extract the speed from the button text
        if (video.playbackRate === speed) {
          btn.classList.add('active-speed');
        } else {
          btn.classList.remove('active-speed');
        }
      });
    }
  };

  // Set the playback speed on button click
  speeds.forEach((speed) => {
    const button = document.createElement('button');
    button.innerText = `${speed}x`;
    button.classList.add('speedy-button');

    // Set playback speed on click
    button.onclick = () => {
      const video = document.querySelector('video');
      if (video) {
        video.playbackRate = speed;
        updateActiveButton(); // Update active button after speed change
      }
    };

    // Append button to the container
    buttonContainer.appendChild(button);
  });

  // Append the container to YouTube's video controls
  controlsContainer.parentNode.insertBefore(buttonContainer, controlsContainer.nextSibling);

  // Add ratechange event listener once
  const video = document.querySelector('video');
  if (video) {
    video.addEventListener('ratechange', updateActiveButton);
  }

  // Initially update button states
  updateActiveButton();
}

// Declare the observer only once to avoid redeclaration
if (typeof observer === 'undefined') {
  const observer = new MutationObserver((mutationsList, observer) => {
    // Check for changes to the video element (e.g., on page load or navigation)
    if (document.querySelector('.ytp-left-controls')) {
      addSpeedButtons();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}
