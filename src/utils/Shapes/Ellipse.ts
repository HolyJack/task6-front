import {
  EllipseConfigWithStartPos,
  InitShapeFunction,
  ToolConfig,
  UpdateShapeFunction,
} from "./ShapeTypes";
import { Ellipse } from "react-konva";

const initEllipse: InitShapeFunction<EllipseConfigWithStartPos> = (shape) => {
  return {
    stroke: shape.color,
    strokeWidth: shape.size,
    ...shape.pos,
    startY: shape.pos.y,
    startX: shape.pos.x,
    radiusY: 0,
    radiusX: 0,
  };
};

const updateEllipse: UpdateShapeFunction<EllipseConfigWithStartPos> = (
  shape,
  pos,
) => {
  const x = ((shape.startX || 0) + pos.x) / 2;
  const y = ((shape.startY || 0) + pos.y) / 2;
  const radiusX = Math.abs((shape.startX || 0) - pos.x) / 2;
  const radiusY = Math.abs((shape.startY || 0) - pos.y) / 2;
  return { ...shape, x, y, radiusX, radiusY };
};

const ellipse: ToolConfig<EllipseConfigWithStartPos> = {
  init: initEllipse,
  update: updateEllipse,
  component: Ellipse,
};

export const name = "ellipse";
export default ellipse;
