console.log("Content script running");

import { chooseVideoSource } from "./utils/videoSourceSelector";
import { trackPuck } from "./utils/puckTracker";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received in content script:", message);
  console.log("From sender:", sender);
  if (message.type === "CHOOSE_VIDEO_SOURCE") {
    console.log("Choosing video source...");
    chooseVideoSource(); // Call the function to choose video source
  } else if (message.type === "START_TRACKING") {
    console.log("Starting puck tracking...");
    trackPuck(); // Call the function to start tracking the puck
  } else if (message.type === "STOP_TRACKING") {
    console.log("Stopping puck tracking...");
  }
});
