import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./popup.css";

export enum PopupState {
  INITIAL = "INITIAL",
  VIDEO_CHOSEN = "VIDEO_CHOSEN",
  // TODO: add STARTED_TRACKING, STOPPED_TRACKING states
  // and update PopupStateManager to handle these states
}

function Popup() {
  const [popupState, setPopupState] = useState<PopupState>(PopupState.INITIAL);

  // first useEffect hook will run on mount to load the current popupState from chrome local storage
  useEffect(() => {
    chrome.storage.local.get("popupState", (result) => {
      if (result.popupState) {
        setPopupState(result.popupState);
      }
    });
  }, []); // empty square brackets indicate to only run on mount when first loaded

  // second useEffect hook will run on change to popupState to store the new state in chrome local storage
  useEffect(() => {
    chrome.storage.local.set({ popupState });
  }, [popupState]); // will only run on change to popupState

  // Runs only once on mount, to register message listener
  useEffect(() => {
    const handleMessage = (message: any) => {
      if (message.type === "VIDEO_SOURCE_CHOSEN") {
        setPopupState(PopupState.VIDEO_CHOSEN);
      } else if (message.type == "VIDEO_SOURCE_RESET") {
        setPopupState(PopupState.INITIAL);
      }
      // TODO: handle other message types here:
    };

    chrome.runtime.onMessage.addListener(handleMessage);

    // Cleanup the listener when component unmounts
    return () => chrome.runtime.onMessage.removeListener(handleMessage);
  }, []);

  const handleChooseVideoClick = () => {
    console.log("Choose video source button clicked");
    // TODO: connect video selection logic
    chrome.runtime.sendMessage({ type: "CHOOSE_VIDEO_SOURCE" }); // tells background script that a video source was chosen
  };

  const handleResetClick = () => {
    console.log("Reset button clicked");
    chrome.runtime.sendMessage({
      type: "RESET",
    });
  };

  return (
    <div className="Popup">
      <header id="topHeader">
        <span>Puck Tracker</span>
        <img
          src="./assets/hockey-player-blue.png"
          alt="Puck Tracker Icon"
          id="hockeyPlayerIcon"
        ></img>
      </header>
      <div className="buttonContainer">
        <button
          id="chooseVideoSourceButton"
          disabled={popupState != PopupState.INITIAL}
          onClick={handleChooseVideoClick}
        >
          Choose Video Source
        </button>
        <button
          id="startTrackingButton"
          disabled={popupState != PopupState.VIDEO_CHOSEN}
        >
          Start Tracking
        </button>
        <button id="stopTrackingButton">Stop Tracking</button>
        <button
          id="resetButton"
          disabled={popupState == PopupState.INITIAL}
          onClick={handleResetClick}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

// access root div in popup.html and render popup
const container = document.getElementById("root");
const root = createRoot(container!); // ! used to tell compiler that container is not null
root.render(<Popup />);
