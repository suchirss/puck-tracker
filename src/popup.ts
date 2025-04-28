console.log("Popup loaded");

// TODO: add UI controls
document.addEventListener("DOMContentLoaded", function () {
  // waits for HTML document to be fully loaded and parsed
  const startTrackingBtn = document.getElementById("startTrackingButton");
  if (startTrackingBtn) {
    // ensure that startTrackingBtn exists before trying to handle a click event
    startTrackingBtn.addEventListener("click", () => {
      chrome.runtime.sendMessage({ type: "START_TRACKING" });
    });
  }
});
