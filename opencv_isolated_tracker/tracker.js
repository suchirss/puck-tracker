function onOpenCvReady() {
  cv["onRuntimeInitialized"] = () => {
    console.log("OpenCV.js is truly ready");

    const video = document.getElementById("inputVideo");
    const videoSrc = "./assets/kadri-slow-mo-breakaway-goal.mp4";

    const image = document.getElementById("templateMatchImage");
    const imageSrc =
      "./assets/kadri-slow-mo-breakaway-goal-image-early-frame.JPG";

    const needleImageSrc =
      "./assets/kadri-slow-mo-breakaway-goal-image-early-frame-puck-close-up.JPG";
    const haystackImageSrc =
      "./assets/kadri-slow-mo-breakaway-goal-image-early-frame.JPG";

    videoSetup(video, videoSrc);
    imageSetup(image, imageSrc);
    pausePlayMutedVideoOnLoop(video);
    matAndCanvasSetup(video);
    templateMatchingImage(needleImageSrc, haystackImageSrc);
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

function imageSetup(image, src) {
  if (image) {
    image.src = src;
  } else {
    console.error("Image element not found");
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

function templateMatchingImage(needle, haystack) {
  /* 
  TODO: proper template matching in browswer:

  Below template matching code is flawed - <image>s must be created in index.html for both needleImage and HaystackImage, then those <image> elements are passed to the cv.matchTemplate() function
  
  Further, the result also needs to be passed to a <result> to be able to see it in browser

  For now, will test template matching in Python first. Then implement in browser openCV if it makes sense. 
  */
  needleImage = cv.imread(needle, cv.IMREAD_UNCHANGED);
  haystackImage = cv.imread(haystack, cv.IMREAD_UNCHANGED);

  result = cv.matchTemplate(haystackImage, needleImage, cv.TM_CCOEFF_NORMED);

  cv.imshow("Result", result);
  cv.waitKey();
}

// window.onOpenCvReady = onOpenCvReady;
