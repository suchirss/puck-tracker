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
  } else if (message.type === "VIDEO_SOURCE_CHOSEN") {
    console.log("Video source chosen in background script");
    chrome.runtime.sendMessage({
      type: "VIDEO_SOURCE_CHOSEN",
    });

    return true; // keep the message channel open for sendMessage to get delivered to the content script without Chrome closing the message channel too early
  } else if (message.type == "VIDEO_SOURCE_RESET") {
    console.log("Video source reset message received in background script");
    chrome.runtime.sendMessage({
      type: "VIDEO_SOURCE_RESET",
    });
  }
});
