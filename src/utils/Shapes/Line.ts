import { LineConfig } from "konva/lib/shapes/Line";
import {
  InitShapeFunction,
  ToolConfig,
  UpdateShapeFunction,
} from "./ShapeTypes";
import { Line } from "react-konva";

const lineDefaults: LineConfig = {
  lineCap: "round",
  lineJoin: "round",
  tension: 0.5,
};

const initLine: InitShapeFunction<LineConfig> = ({ color, pos, size }) => {
  return {
    ...lineDefaults,
    points: [pos.x, pos.y],
    stroke: color,
    strokeWidth: size,
  };
};

const updateLine: UpdateShapeFunction<LineConfig> = (shape, pos) => {
  return {
    ...shape,
    points: (shape.points as number[]).concat([pos.x, pos.y]),
  };
};

const line: ToolConfig<LineConfig> = {
  init: initLine,
  update: updateLine,
  component: Line,
};

export const name = "line";
export default line;
