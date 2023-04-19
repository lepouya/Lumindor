import { Context } from "../model/Context";
import initCharDesigner from "./CharDesigner";
import initTutorial from "./Tutorial";

export default function initGame(context: Context) {
  initTutorial(context);
  initCharDesigner(context);
}
