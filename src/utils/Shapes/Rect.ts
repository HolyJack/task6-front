import { Rect } from "react-konva";
import { RectConfig } from "konva/lib/shapes/Rect";
import {
  InitShapeFunction,
  ToolConfig,
  UpdateShapeFunction,
} from "./ShapeTypes";

const initRect: InitShapeFunction<RectConfig> = ({ color, pos, size }) => {
  return { ...pos, stroke: color, strokeWidth: size };
};

const updateRect: UpdateShapeFunction<RectConfig> = (shape, pos) => {
  return {
    ...shape,
    width: pos.x - (shape.x || 0),
    height: pos.y - (shape.y || 0),
  };
};

const rectangle: ToolConfig<RectConfig> = {
  init: initRect,
  update: updateRect,
  component: Rect,
};

export const name = "rectangle";
export default rectangle;
