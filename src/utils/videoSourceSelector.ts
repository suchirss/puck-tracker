export function chooseVideoSource() {
  let videoSource = null; // Initialize videoSource variable

  console.log("Choosing video source...");

  // Find all <video> elements on the page
  const videoElements = document.querySelectorAll("video");

  if (videoElements.length === 0) {
    console.log("No video elements found on this page.");
    return;
  }

  console.log(`Found ${videoElements.length} video element(s):`);
  videoElements.forEach((video, index) => {
    console.log(`Video ${index + 1}:`, video);

    // Create a translucent overlay
    const overlay = document.createElement("div");
    overlay.classList.add("video-overlay"); // Default overlay class

    const rect = video.getBoundingClientRect();

    // Position the overlay over the video element
    overlay.style.left = `${rect.left + window.scrollX}px`;
    overlay.style.top = `${rect.top + window.scrollY}px`;
    overlay.style.width = `${rect.width}px`;
    overlay.style.height = `${rect.height}px`;

    // Append the overlay to the document body
    document.body.appendChild(overlay);

    // Add hover event listeners to the video element
    video.addEventListener("mouseenter", () => {
      console.log("Mouse entered video");
      overlay.style.backgroundColor = "rgba(8, 166, 246, 0.45)"; // slightly change colour on hover

      video.addEventListener(
        "click",
        () => {
          console.log("Video clicked");

          videoSource = video;

          overlay.remove();
        },
        { once: true }
      );
    });

    video.addEventListener("mouseleave", () => {
      console.log("Mouse left video");
      overlay.style.backgroundColor = "rgba(8, 166, 246, 0.65)"; // restore original colour
    });
  });
}
