import { CircleConfig } from "konva/lib/shapes/Circle";
import {
  InitShapeFunction,
  ToolConfig,
  UpdateShapeFunction,
} from "./ShapeTypes";
import { Circle } from "react-konva";

const initCircle: InitShapeFunction<CircleConfig> = (shape) => {
  return { stroke: shape.color, strokeWidth: shape.size, ...shape.pos };
};

const updateCircle: UpdateShapeFunction<CircleConfig> = (shape, pos) => {
  const radius = Math.sqrt(
    Math.pow((shape.x || 0) - pos.x, 2) + Math.pow((shape.y || 0) - pos.y, 2),
  );
  return { ...shape, radius };
};

const circle: ToolConfig<CircleConfig> = {
  init: initCircle,
  update: updateCircle,
  component: Circle,
};

export const name = "circle";
export default circle;
