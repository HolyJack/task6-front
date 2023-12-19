import { InitShapeFunction, ToolConfig } from "./ShapeTypes";
import { StarConfig } from "konva/lib/shapes/Star";
import star from "./Star";

const initStarFill: InitShapeFunction<StarConfig> = (shape) => {
  return {
    fill: shape.color,
    ...shape.pos,
    numPoints: 5,
    innerRadius: 0,
    outerRadius: 0,
  };
};

const starFill: ToolConfig<StarConfig> = {
  ...star,
  init: initStarFill,
};

export const name = "starFill";
export default starFill;
