// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var timer = null;
chrome.runtime.onMessage.addListener(
  function(data, sender, sendResponse) {
    var opt = {
    type: "basic",
    title: data.title,
    message: data.message,
    iconUrl: "copy-icon.png",
  };

  chrome.notifications.create("copied", opt, function(id){
    if(timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(function(){chrome.notifications.clear(id);}, 1500);
  });
});

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // No tabs or host permissions needed!
  chrome.tabs.executeScript(null, {file: "content_script.js"});
});


