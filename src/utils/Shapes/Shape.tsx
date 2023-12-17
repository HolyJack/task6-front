import {
  MyShapeConfigs,
  MyShapeConfigsWithTool,
  ToolConfig,
} from "./ShapeTypes";
import line, { name as l } from "./Line";
import rectangle, { name as r } from "./Rect";
import eraser, { name as e } from "./Eraser";
import circle, { name as c } from "./Circle";
import React from "react";
import isEqual from "lodash.isequal";

const tool = [];
const ShapeMap: Record<string, ToolConfig<MyShapeConfigs>> = {};

ShapeMap[l] = line;
ShapeMap[r] = rectangle;
ShapeMap[e] = eraser;
ShapeMap[c] = circle;

tool.push(l);
tool.push(r);
tool.push(e);
tool.push(c);

export type Tool = typeof l | typeof r | typeof e | typeof c;

const TypedShapeMap: Record<
  Tool,
  ToolConfig<MyShapeConfigs>
> = ShapeMap as Record<Tool, ToolConfig<MyShapeConfigs>>;

function areEqual(
  prevProps: MyShapeConfigsWithTool,
  nextProps: MyShapeConfigsWithTool,
) {
  if (prevProps.tool !== nextProps.tool) return false;

  const prevKeys = Object.keys(prevProps);
  const nextKeys = Object.keys(nextProps);

  if (prevKeys.length !== nextKeys.length) return false;
  return isEqual(prevProps, nextProps);
}

const MyShape = React.memo((props: MyShapeConfigsWithTool) => {
  const { tool, ...componentProps } = props;
  if (!tool) return null;
  const { component: Component } = TypedShapeMap[tool as Tool];
  return <Component {...componentProps} />;
}, areEqual);

export { MyShape };
export default TypedShapeMap;
