export function chooseVideoSource() {
  console.log("Choosing video source...");
  // TODO: allow user to select video source on which puck tracking will be performed

  // Find all <video> elements on the page
  const videoElements = document.querySelectorAll("video");

  if (videoElements.length === 0) {
    console.log("No video elements found on this page.");
    return;
  }

  console.log(`Found ${videoElements.length} video element(s):`);
  videoElements.forEach((video, index) => {
    console.log(`Video ${index + 1}:`, video);

    // Optionally log the video source URL if available
    if (video.src) {
      console.log(`Video ${index + 1} source: ${video.src}`);
    } else {
      console.log(`Video ${index + 1} has no direct src attribute.`);
    }
  });
}
