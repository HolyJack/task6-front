import React from "react";

import isEqual from "lodash.isequal";
import {
  MyShapeConfigs,
  MyShapeConfigsWithTool,
  ToolConfig,
  ToolConfigMap,
} from "./ShapeTypes";
import line, { name as l } from "./Line";
import rectangle, { name as r } from "./Rect";
import eraser, { name as er } from "./Eraser";
import circle, { name as c } from "./Circle";
import rectangleFill, { name as rf } from "./RectFill";
import circleFill, { name as cf } from "./CircleFill";
import ellipse, { name as e } from "./Ellipse";
import ellipseFill, { name as ef } from "./EllipseFill";
import star, { name as s } from "./Star";
import starFill, { name as sf } from "./StarFill";

const tool: string[] = [];
const ShapeMap: ToolConfigMap = {};

function registerShape<T>(name: string, toolConfig: ToolConfig<T>) {
  tool.push(name);
  ShapeMap[name] = toolConfig;
}

registerShape(l, line);
registerShape(r, rectangle);
registerShape(e, ellipse);
registerShape(s, star);
registerShape(c, circle);

registerShape(er, eraser);
registerShape(rf, rectangleFill);
registerShape(cf, circleFill);
registerShape(ef, ellipseFill);
registerShape(sf, starFill);

export type Tool =
  | typeof l
  | typeof r
  | typeof e
  | typeof c
  | typeof s
  | typeof rf
  | typeof cf
  | typeof ef
  | typeof er
  | typeof sf;

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
