let tabId = null;

document.getElementById('start').addEventListener('click', () => {
  
  
  chrome.tabs.create({
    url: chrome.runtime.getURL("permission_request.html"),
    pinned: true,
    active: false
  }).then(tab => {
    tabId = tab.id;
});
});


document.getElementById('stop').addEventListener('click', () => {
  
  chrome.runtime.sendMessage({action: "disableMic"});
  chrome.action.setIcon({ path: "/icons/off.png" });
  if (tabId) {
    chrome.tabs.remove(tabId);
  }
});

