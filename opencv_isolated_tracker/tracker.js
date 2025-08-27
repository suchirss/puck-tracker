function onOpenCvReady() {
  console.log("OpenCV.js is ready");

  const video = document.getElementById("inputVideo");
  if (video) {
    video.src = "./assets/kadri-slow-mo-breakaway-goal.mp4";
    video.load();
  } else {
    console.error("Video element not found");
  }

  const playVideoButton = document.getElementById("playVideoButton");

  playVideoButton.onclick = () => {
    video.play();
    video.loop = true;
  };
}
