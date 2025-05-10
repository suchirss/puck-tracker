console.log("Content script running");

// TODO: here initialize puck tracking
import { trackPuck } from "./utils/puckTracker";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received in content script:", message);
  console.log("From sender:", sender);

  if (message.type === "START_TRACKING") {
    // Forward the message to the content  script
    console.log("Starting puck tracking...");
    trackPuck(); // Call the function to start tracking the puck
  } else if (message.type === "STOP_TRACKING") {
    // Forward the message to the content script
    console.log("Stopping puck tracking...");
  }
});
