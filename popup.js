let skipIntro = document.getElementById('skip-intro');
let skipRecap = document.getElementById('skip-recap');

chrome.storage.sync.get(['skipIntro', 'skipRecap'], (result) => {
  skipIntro.checked = (typeof(result.skipIntro) !== 'undefined') ? result.skipIntro : true;
  skipRecap.checked = (typeof(result.skipRecap) !== 'undefined') ? result.skipRecap : false;
});

skipIntro.onclick = (node) => {
  chrome.storage.sync.set({'skipIntro': node.target.checked});
}

skipRecap.onclick = (node) => {
  chrome.storage.sync.set({'skipRecap': node.target.checked});
}
