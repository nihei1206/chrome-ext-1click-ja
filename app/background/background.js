chrome.browserAction.onClicked.addListener(function(tab) {
  if(statusManager.getStatus()) {
    chrome.browserAction.setIcon({path:"../icon/icon-19-off.png"});
  } else {
    chrome.browserAction.setIcon({path:"../icon/icon-19-on.png"});
  }
  statusManager.changeStatus();

  if(urlManager.isGoogle(tab.url)) {
    if(statusManager.getStatus()) {
      chrome.tabs.update(tab.id, {url:tab.url + "&lr=lang_ja"});
    } else {
      var url = tab.url;
      url = url.replace(/&lr=lang_ja/g, "");
      url = url.replace(/&lr=lang_ja/g, "");
      chrome.tabs.update(tab.id, {url:url});
    }
  }
});
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if(statusManager.getStatus()) {
    if(urlManager.isGoogle(tab.url) && !urlManager.getParam(tab.url, "ls") && !urlManager.getParam(tab.url, "url")) {
      chrome.tabs.update(tabId, {url:tab.url + "&lr=lang_ja"});
    }
  }
});
