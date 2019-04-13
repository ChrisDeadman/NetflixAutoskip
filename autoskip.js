// return whether an option in synced storage is set
getOption = (id, defaultValue, receiver) => {
  chrome.storage.sync.get([id], result => {
    receiver((typeof(result[id]) !== 'undefined') ? result[id] : defaultValue);
  });
}

// click node (causes pause) and after 500ms click play button
click = (node) => {
  node.click();
  setTimeout(() => {
    let playButton = document.querySelector('.button-nfplayerPlay');
    if (playButton) {
      playButton.click();
    }
  }, 500);
}

// match a node for 'skip' button and click it according to options
matchAndClick = (node) => {
  if (node.nodeType === 1 && node.matches('.skip-credits')) {
    skipButton = node.firstChild
    label = skipButton.getAttribute('aria-label').toLowerCase()
    if (label.includes('intro')) {
      getOption('skipIntro', true, (value) => {
        if (value) {
          click(skipButton);
        }
      });
    }
    if (label.includes('recap')) {
      getOption('skipRecap', false, (value) => {
        if (value) {
          click(skipButton);
        }
      });
    }
  }
}

// send each added node through matchAndClick
matchAddedNodes = (mutation) => mutation.addedNodes.forEach(matchAndClick);

// observe DOM for any change
new MutationObserver(mutations => mutations.map(matchAddedNodes)).observe(document.documentElement, { childList: true, subtree: true });

// observe our options for any change
chrome.storage.onChanged.addListener((changes, namespace) => {
  let skipCredits = document.querySelector('.skip-credits');
  if (skipCredits) {
    if (typeof(changes['skipIntro']) !== 'undefined') {
      matchAndClick(skipCredits);
    }
    else if (typeof(changes['skipRecap']) !== 'undefined') {
      matchAndClick(skipCredits);
    }
  }
})
