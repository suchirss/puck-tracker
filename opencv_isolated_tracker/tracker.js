function onOpenCvReady() {
  cv["onRuntimeInitialized"] = () => {
    console.log("OpenCV.js is truly ready");

    const video = document.getElementById("inputVideo");
    const src = "./assets/kadri-slow-mo-breakaway-goal.mp4";

    videoSetup(video, src);
    pausePlayMutedVideoOnLoop(video);
    matAndCanvasSetup(video);
  };
}

function videoSetup(video, src) {
  if (video) {
    video.src = src;
    video.load();
  } else {
    console.error("Video element not found");
  }
}

function pausePlayMutedVideoOnLoop(video) {
  video.onclick = () => {
    video.paused ? video.play() : video.pause();
    video.loop = true;
    video.muted = true;
  };
}

function matAndCanvasSetup(video) {
  video.addEventListener("loadedmetadata", () => {
    console.log("video metadata loaded");

    const canvas = document.getElementById("outputCanvas");

    // vars for reused video dimensions
    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;

    // set up canvas
    canvas.width = videoWidth;
    canvas.height = videoHeight;

    // create openCV mat using video dimensions
    const mat = new cv.Mat(videoHeight, videoWidth, cv.CV_8UC4);
    // const cap = new cv.VideoCapture(video);

    // cap.read(mat);

    // set up vars to use cv.circles
    const videoCenter = new cv.Point(videoWidth / 2, videoHeight / 2);
    const radius = 50;
    const colour = new cv.Scalar(255, 0, 0, 255);
    const thickness = 3;

    cv.circle(mat, videoCenter, radius, colour, thickness);

    // render the mat on the canvas
    cv.imshow(canvas, mat);

    // remove Mat
    mat.delete();
  });
}

window.onOpenCvReady = onOpenCvReady;
