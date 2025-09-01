console.log("Content script running");

import { chooseVideoSource } from "./utils/videoSourceSelector";
import { trackPuck } from "./utils/puckTracker";

let currentVideoSource: HTMLVideoElement | null;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received in content script:", message);
  console.log("From sender:", sender);

  if (message.type === "CHOOSE_VIDEO_SOURCE") {
    console.log("Choosing video source...");
    chooseVideoSource().then((video) => {
      if (video) {
        currentVideoSource = video;
        console.log("Video source chosen:", video);
        chrome.runtime.sendMessage({
          type: "VIDEO_SOURCE_CHOSEN",
        }); // Notify the popup through the background script that the video source has been chosen (in order to update the popup UI)
      } else {
        console.log("No video source selected.");
      }
    }); // Call the function to choose video source
  } else if (message.type === "START_TRACKING") {
    console.log("Starting puck tracking...");
    trackPuck(); // Call the function to start tracking the puck
  } else if (message.type === "STOP_TRACKING") {
    console.log("Stopping puck tracking...");
  } else if (message.type == "RESET") {
    console.log("Resetting Popup UI");
    currentVideoSource = null;
    chrome.runtime.sendMessage({
      type: "VIDEO_SOURCE_RESET",
    });
  }
});
