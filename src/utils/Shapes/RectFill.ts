import { RectConfig } from "konva/lib/shapes/Rect";
import rectangle from "./Rect";
import { InitShapeFunction, ToolConfig } from "./ShapeTypes";

const initRect: InitShapeFunction<RectConfig> = ({ color, pos }) => {
  return { ...pos, fill: color };
};

const rectangleFill: ToolConfig<RectConfig> = { ...rectangle, init: initRect };

export const name = "rectangleFill";
export default rectangleFill;
