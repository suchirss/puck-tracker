export enum PopupState {
  INITIAL = "INITIAL",
  VIDEO_CHOSEN = "VIDEO_CHOSEN",
  // TODO: add STARTED_TRACKING, STOPPED_TRACKING states
  // and update PopupStateManager to handle these states
}

export class PopupStateManager {
  private state: PopupState = PopupState.INITIAL;

  // Store button references as properties
  private chooseVideoSourceBtn!: HTMLButtonElement;
  private startTrackingBtn!: HTMLButtonElement;
  private stopTrackingBtn!: HTMLButtonElement;

  constructor() {
    this.chooseVideoSourceBtn = document.getElementById(
      "chooseVideoSourceButton"
    ) as HTMLButtonElement;
    this.startTrackingBtn = document.getElementById(
      "startTrackingButton"
    ) as HTMLButtonElement;
    this.stopTrackingBtn = document.getElementById(
      "stopTrackingButton"
    ) as HTMLButtonElement;

    if (
      !this.chooseVideoSourceBtn ||
      !this.startTrackingBtn ||
      !this.stopTrackingBtn
    ) {
      throw new Error("One or more buttons are missing in the DOM.");
    }
  }

  public getChooseVideoSourceButton(): HTMLButtonElement {
    return this.chooseVideoSourceBtn;
  }

  public getStartTrackingButton(): HTMLButtonElement {
    return this.startTrackingBtn;
  }

  public getStopTrackingButton(): HTMLButtonElement {
    return this.stopTrackingBtn;
  }

  public getState(): PopupState {
    return this.state;
  }

  public setState(newState: PopupState): void {
    this.state = newState;
    console.log(`Popup state changed to: ${this.state}`);
    this.updateUIOnStateChange();

    // Persist the state in Chrome storage
    chrome.storage.local.set({ popupState: this.state }, () => {
      console.log("Popup state saved to storage: ", this.state);
    });
  }

  private updateUIOnStateChange(): void {
    if (this.state === PopupState.INITIAL) {
      this.chooseVideoSourceBtn.disabled = false;
      this.startTrackingBtn.disabled = true;
      this.stopTrackingBtn.disabled = true;
    } else if (this.state === PopupState.VIDEO_CHOSEN) {
      this.chooseVideoSourceBtn.disabled = true;
      this.startTrackingBtn.disabled = false;
      this.stopTrackingBtn.disabled = true;
    }
  }
}

// use the singleton pattern to ensure only one instance of PopupStateManager exists
export const popupStateManager = new PopupStateManager();
