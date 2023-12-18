import { CircleConfig } from "konva/lib/shapes/Circle";
import { InitShapeFunction, ToolConfig } from "./ShapeTypes";
import circle from "./Circle";

const initCircle: InitShapeFunction<CircleConfig> = (shape) => {
  return { fill: shape.color, ...shape.pos };
};

const circleFill: ToolConfig<CircleConfig> = { ...circle, init: initCircle };

export const name = "circleFill";
export default circleFill;
