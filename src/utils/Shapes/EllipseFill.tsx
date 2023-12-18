import ellipse from "./Ellipse";
import {
  EllipseConfigWithStartPos,
  InitShapeFunction,
  ToolConfig,
} from "./ShapeTypes";

const initEllipse: InitShapeFunction<EllipseConfigWithStartPos> = (shape) => {
  return {
    fill: shape.color,
    ...shape.pos,
    startY: shape.pos.y,
    startX: shape.pos.x,
    radiusY: 0,
    radiusX: 0,
  };
};

const ellipseFill: ToolConfig<EllipseConfigWithStartPos> = {
  ...ellipse,
  init: initEllipse,
};

export const name = "ellipseFill";
export default ellipseFill;
