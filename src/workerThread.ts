declare const cv: any; // Declare OpenCV globally
// declare tells compiler that cv is a global variable - "dont complain about not finding a definition for cv"
// This is necessary because OpenCV.js is loaded dynamically and may not be available immediately
// :any is used to avoid type checking for cv for TypeScript

importScripts(chrome.runtime.getURL("wasm/opencv.js")); // Load OpenCV.js in the worker

cv["onRuntimeInitialized"] = () => {
  // safe to receive INIT/FRAME messages now
};

let ctx: OffscreenCanvasRenderingContext2D | null = null; // Context for OffscreenCanvas
let src: any; // stores OpenCV Mat object

self.onmessage = (e) => {
  const { type } = e.data; // destructuring the message data

  if (type == "INIT") {
    // make sure that canvas is an OffscreenCanvas
    // make sure that the message type is "INIT"
    const { canvas, videoWidth, videoHeight } = e.data; // destructuring canvas and video dimensions from message data

    ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error("Provided canvas does not have a 2D context.");
      return;
    }

    src = new cv.Mat(videoHeight, videoWidth, cv.CV_8UC4);
    console.log("Worker initialized with Offscreen Canvas:", src);
    // create an openCV Mat object with the dimensions of the video
    // CV_8UC4 is a 4-channel (RGBA) 8-bit unsigned integer matrix
  } else if (type == "FRAME" && ctx && src) {
    const { imageBitMap, videoWidth, videoHeight } = e.data; // destructuring image bitmap and video dimensions from message data

    try {
      ctx.clearRect(0, 0, videoWidth, videoHeight); // clear the canvas before drawing
      ctx.drawImage(imageBitMap, 0, 0, videoWidth, videoHeight); // draw the image bitmap onto the canvas

      const imageData = ctx.getImageData(0, 0, videoWidth, videoHeight); // get the image data from the canvas
      src.data.set(imageData.data); // set the data of the OpenCV Mat object to the image data
    } catch (error) {
      console.error("Error processing frame in worker:", error);
      return;
    }
  }
};
