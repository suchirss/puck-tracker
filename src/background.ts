chrome.runtime.onInstalled.addListener(() => {
  console.log("Puck Tracker Extension Installed!");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received in background:", message);
  console.log("From sender:", sender);

  if (
    message.type === "START_TRACKING" ||
    message.type === "STOP_TRACKING" ||
    message.type === "CHOOSE_VIDEO_SOURCE" ||
    message.type == "RESET"
  ) {
    // Forward the message to the content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.sendMessage(tabs[0].id, message);
      }
    });
  }
});
