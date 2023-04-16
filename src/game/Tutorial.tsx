import { Context } from "../model/Context";
import { PopupGenerator } from "../model/Popup";

export default function initTutorial(context: Context) {
  context.popupManager.register(...tsInit);
  context.popupManager.setPopupState("Tutorial", {});
}

const tsInit: PopupGenerator<Context>[] = [
  {
    name: "Tutorial",
    step: 0,
    title: "Starting Tutorial",
    body: (
      <>
        <div className="full">Hi! Welcome to Lumindor.</div>
        <div className="full">
          I don't really have anything to tell you here yet.
        </div>
        <div className="full">
          These dialogs are tests of the tutorial system.
        </div>
      </>
    ),
    greyOut: true,
  },
];
