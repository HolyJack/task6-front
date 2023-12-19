import { Star } from "react-konva";
import {
  InitShapeFunction,
  ToolConfig,
  UpdateShapeFunction,
} from "./ShapeTypes";
import { StarConfig } from "konva/lib/shapes/Star";

const initStar: InitShapeFunction<StarConfig> = (shape) => {
  return {
    stroke: shape.color,
    strokeWidth: shape.size,
    ...shape.pos,
    numPoints: 5,
    innerRadius: 0,
    outerRadius: 0,
  };
};

const updateStar: UpdateShapeFunction<StarConfig> = (shape, pos) => {
  const radius = Math.sqrt(
    Math.pow((shape.x || 0) - pos.x, 2) + Math.pow((shape.y || 0) - pos.y, 2),
  );
  return { ...shape, innerRadius: radius / 2, outerRadius: radius };
};

const star: ToolConfig<StarConfig> = {
  init: initStar,
  update: updateStar,
  component: Star,
};

export const name = "star";
export default star;
