import React from "react";

import isEqual from "lodash.isequal";
import {
  MyShapeConfigs,
  MyShapeConfigsWithTool,
  ToolConfig,
} from "./ShapeTypes";
import line, { name as l } from "./Line";
import rectangle, { name as r } from "./Rect";
import eraser, { name as er } from "./Eraser";
import circle, { name as c } from "./Circle";
import rectangleFill, { name as rf } from "./RectFill";
import circleFill, { name as cf } from "./CircleFill";
import ellipse, { name as e } from "./Ellipse";
import ellipseFill, { name as ef } from "./EllipseFill";

const tool: string[] = [];
const ShapeMap: Record<string, ToolConfig<MyShapeConfigs>> = {};

ShapeMap[l] = line;
ShapeMap[r] = rectangle;
//@ts-expect-error: TS says types are incompitable
ShapeMap[e] = ellipse;
ShapeMap[c] = circle;
ShapeMap[rf] = rectangleFill;
ShapeMap[cf] = circleFill;
//@ts-expect-error: TS says types are incompitable
ShapeMap[ef] = ellipseFill;
ShapeMap[er] = eraser;

tool.push(l);
tool.push(r);
tool.push(e);
tool.push(c);
tool.push(rf);
tool.push(cf);
tool.push(ef);
tool.push(er);

export type Tool =
  | typeof l
  | typeof r
  | typeof e
  | typeof c
  | typeof rf
  | typeof cf
  | typeof ef
  | typeof er;

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

export { MyShape, tool };
export default TypedShapeMap;
