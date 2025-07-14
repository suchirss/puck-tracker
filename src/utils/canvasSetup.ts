export { setupVideoAndCanvas };

let videoElement: HTMLVideoElement;
let canvasOverlay: HTMLCanvasElement;
let worker: Worker;

async function setupVideoAndCanvas(video: HTMLVideoElement) {
  // video setup
  videoElement = video;
  videoElement.style.position = "fixed";
  videoElement.style.top = "0";
  videoElement.style.left = "0";
  videoElement.style.zIndex = "-1"; // behind other elements
  videoElement.muted = true; // mute the video
  videoElement.autoplay = true; // autoplay the video
  videoElement.playsInline = true; // play inline on mobile devices

  await videoElement.play();

  document.body.appendChild(videoElement); // append the video element to the body

  const { videoWidth, videoHeight } = videoElement;

  // canvas overlay to show the tracking results
  canvasOverlay = document.createElement("canvas");
  canvasOverlay.width = videoWidth;
  canvasOverlay.height = videoHeight;
  canvasOverlay.style.position = "fixed";
  canvasOverlay.style.top = "0";
  canvasOverlay.style.left = "0";
  canvasOverlay.style.zIndex = "1000"; // above other elements
  canvasOverlay.style.pointerEvents = "none"; // allow clicks to pass through

  document.body.appendChild(canvasOverlay);

  const offscreenCanvas = canvasOverlay.transferControlToOffscreen(); // transfer the canvas to an OffscreenCanvas to allow Web Worker processing

  // predefine the worker thread URL and the open CV URL
  const workerThreadURL = chrome.runtime.getURL("workerThread.js");
  const opencvURL = chrome.runtime.getURL("wasm/opencv.js");

  // use a Blob URL to load the worker script to avoid issues with dynamic imports in workers
  const workerUrl = URL.createObjectURL(
    new Blob(
      [
        `
        import "${workerThreadURL}";
        import "${opencvURL}";
        `,
      ],
      {
        type: "application/javascript",
      }
    )
  );

  worker = new Worker(workerUrl, { type: "module" });
  // type module because we are using ES6 modules in the worker - allows us to use import/export syntax

  worker.postMessage(
    {
      type: "INIT",
      canvas: offscreenCanvas,
      videoWidth,
      videoHeight,
    },
    [offscreenCanvas] // transfer the OffscreenCanvas to the worker
  );

  startFrameLoop(videoElement, videoWidth, videoHeight);
}

// helper function to start the frame loop and push frames to the worker
function startFrameLoop(
  video: HTMLVideoElement,
  width: number,
  height: number
) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  // helper function to push frames to the worker
  const pushFrameToWorker = async () => {
    // guard against video not being ready
    if (
      video.readyState < 2 ||
      video.videoWidth === 0 ||
      video.videoHeight === 0
    ) {
      // Skip drawing if video isn't ready or resolution is 0
      requestAnimationFrame(pushFrameToWorker);
      return;
    }

    // draw the current video frame to the canvas
    ctx?.drawImage(video, 0, 0, width, height);

    // convert the canvas to an ImageBitmap and send it to the worker
    try {
      const bitmap = await createImageBitmap(canvas);
      worker.postMessage(
        {
          type: "FRAME",
          imageBitMap: bitmap,
          videoWidth: width,
          videoHeight: height,
        },
        [bitmap] // transfer the bitmap to the worker
      );
    } catch (error) {
      console.error("Error creating ImageBitmap:", error);
    }

    requestAnimationFrame(pushFrameToWorker); // continue the loop
  };

  pushFrameToWorker(); // start the frame loop
}
