import { popupStateManager, PopupState } from "./utils/popupStateManager";

console.log("Popup loaded");

// TODO: add UI controls
document.addEventListener("DOMContentLoaded", function () {
  // waits for HTML document to be fully loaded and parsed

  // popupStateManager.setState(PopupState.INITIAL); // set initial state

  chrome.storage.local.get("popupState", (result) => {
    const savedState = result.popupState as PopupState;
    if (savedState) {
      console.log("Restoring saved state from storage: ", savedState);
      popupStateManager.setState(savedState); // restore state from storage
    } else {
      console.log("No saved state found in storage, using initial state.");
      popupStateManager.setState(PopupState.INITIAL); // set initial state
    }
  });

  // Listen to messages from the background script
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Message received in popup:", message);
    console.log("From sender:", sender);

    if (message.type === "VIDEO_SOURCE_CHOSEN") {
      console.log("Video source chosen in popup");
      popupStateManager.setState(PopupState.VIDEO_CHOSEN); // set state to VIDEO_CHOSEN
    }
  });

  console.log(
    "Choose video source button:",
    popupStateManager.getChooseVideoSourceButton()
  );
  console.log("Start button:", popupStateManager.getStartTrackingButton());
  console.log("Stop button:", popupStateManager.getStopTrackingButton());

  if (popupStateManager.getChooseVideoSourceButton()) {
    // ensure that chooseVideoSourceBtn exists before trying to handle a click event
    popupStateManager
      .getChooseVideoSourceButton()
      .addEventListener("click", () => {
        console.log("Choose video source button clicked");
        chrome.runtime.sendMessage({ type: "CHOOSE_VIDEO_SOURCE" });
      });
  }

  if (popupStateManager.getStartTrackingButton()) {
    // ensure that startTrackingBtn exists before trying to handle a click event
    popupStateManager.getStartTrackingButton().addEventListener("click", () => {
      console.log("Start button clicked");
      chrome.runtime.sendMessage({ type: "START_TRACKING" });
    });
  }

  if (popupStateManager.getStopTrackingButton()) {
    // ensure that stopTrackingBtn exists before trying to handle a click event
    popupStateManager.getStopTrackingButton().addEventListener("click", () => {
      console.log("Stop button clicked");
      chrome.runtime.sendMessage({ type: "STOP_TRACKING" });
    });
  }
});
