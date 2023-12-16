import { LineConfig } from "konva/lib/shapes/Line";
import { InitShapeFunction, ToolConfig } from "./ShapeTypes";
import line from "./Line";

const initEraser: InitShapeFunction<LineConfig> = (shape) => {
  return {
    ...line.init(shape),
    stroke: undefined,
    globalCompositeOperation: "destination-out",
  };
};

const eraser: ToolConfig<LineConfig> = { ...line, init: initEraser };

export const name = "eraser";
export default eraser;
