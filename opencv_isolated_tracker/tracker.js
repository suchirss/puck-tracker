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

    // vars for reused video dimensions
    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;

    // create openCV mat using video dimensions
    const mat = new cv.Mat(videoHeight, videoWidth, cv.CV_8UC4);

    // set up vars to use cv.circles
    const videoCenter = new cv.Point(videoWidth / 2, videoHeight / 2);
    const radius = 50;
    const colour = new cv.Scalar(255, 0, 0, 255);
    const thickness = 3;

    cv.circle(mat, videoCenter, radius, colour, thickness);

    // render the openCV Mat on the canvas
    const canvas = document.getElementById("outputCanvas");
    canvas.width = videoWidth;
    canvas.height = videoHeight;
    cv.imshow(canvas, mat);

    // remove Mat
    mat.delete();
  };
}
