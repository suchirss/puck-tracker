console.log("Popup loaded");

// TODO: add UI controls
document.addEventListener("DOMContentLoaded", function () {
  // waits for HTML document to be fully loaded and parsed
  const startTrackingBtn = document.getElementById("startTrackingButton");
  const stopTrackingBtn = document.getElementById("stopTrackingButton");

  console.log("Start button:", startTrackingBtn);
  console.log("Stop button:", stopTrackingBtn);

  if (startTrackingBtn) {
    // ensure that startTrackingBtn exists before trying to handle a click event
    startTrackingBtn.addEventListener("click", () => {
      console.log("Start button clicked");
      chrome.runtime.sendMessage({ type: "START_TRACKING" });
    });
  }

  if (stopTrackingBtn) {
    // ensure that stopTrackingBtn exists before trying to handle a click event
    stopTrackingBtn.addEventListener("click", () => {
      console.log("Stop button clicked");
      chrome.runtime.sendMessage({ type: "STOP_TRACKING" });
    });
  }
});
