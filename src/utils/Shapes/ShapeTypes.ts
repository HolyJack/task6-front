import { CircleConfig } from "konva/lib/shapes/Circle";
import { EllipseConfig } from "konva/lib/shapes/Ellipse";
import { LineConfig } from "konva/lib/shapes/Line";
import { RectConfig } from "konva/lib/shapes/Rect";
import { StarConfig } from "konva/lib/shapes/Star";
import { ComponentType } from "react";

export type EllipseConfigWithStartPos = EllipseConfig & {
  startX: number;
  startY: number;
};

export type MyShapeConfigs =
  | LineConfig
  | RectConfig
  | CircleConfig
  | EllipseConfigWithStartPos
  | StarConfig;

export type MyShapeConfigsWithTool = MyShapeConfigs & { tool?: string };

export type CursorPosition = {
  x: number;
  y: number;
};

type ShapeArgs = {
  color: string;
  pos: CursorPosition;
  size: number;
};

export type UpdateShapeFunction<T> = (shape: T, pos: CursorPosition) => T;
export type InitShapeFunction<T> = (shape: ShapeArgs) => T;
export type ToolConfig<T> = {
  init: InitShapeFunction<T>;
  update: UpdateShapeFunction<T>;
  component: ComponentType<T>;
};

export type ToolConfigMap = Record<string, ToolConfig<any>>;
