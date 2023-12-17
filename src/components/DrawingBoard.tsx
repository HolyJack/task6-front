import { Layer, Stage, Rect, Circle, Group, Text } from "react-konva";
import { useEffect, useRef, useState } from "react";
import { KonvaEventObject } from "konva/lib/Node";
import { UserData, Users } from "../App";
import { socket } from "../socket";
import TypedShapeMap, { MyShape, Tool } from "../utils/Shapes/Shape";
import {
  MyShapeConfigs,
  MyShapeConfigsWithTool,
} from "../utils/Shapes/ShapeTypes";

export const WIDTH = 1024;
export const HEIGHT = 1024;

export default function DrawingBoard({
  username,
  room,
  shapes,
  users,
}: {
  username: string;
  room: string;
  shapes: MyShapeConfigsWithTool[];
  users: Users;
}) {
  const isDrawing = useRef(false);
  const [tool, setTool] = useState<Tool>("line");
  const [color, setColor] = useState<string>("#000000");
  const [size, setSize] = useState<number>(5);
  const [shape, setShape] = useState<MyShapeConfigs | undefined>();
  const [stagedShape, setStagedShape] = useState<MyShapeConfigs | undefined>();
  const { init: initShape, update: updateShape } = TypedShapeMap[tool as Tool];

  function submitShape(shape: MyShapeConfigsWithTool) {
    socket.emit("new shape", room, shape);
  }

  useEffect(() => {
    setStagedShape(undefined);
  }, [shapes]);

  function handleMouseDown(
    e: KonvaEventObject<MouseEvent> | KonvaEventObject<TouchEvent>,
  ) {
    isDrawing.current = true;
    const pos = e.target.getStage()?.getPointerPosition();
    if (!pos) return;
    setShape(initShape({ color, size, pos }));
  }

  function handleMouseUp() {
    isDrawing.current = false;
    if (shape && tool) submitShape({ tool, color, ...shape });
    setStagedShape(() => {
      const s = shape;
      setShape(undefined);
      return s;
    });
  }

  function handleMouseMove(
    e: KonvaEventObject<MouseEvent> | KonvaEventObject<TouchEvent>,
  ) {
    const pos = e.target.getStage()?.getPointerPosition();
    if (!pos) return;
    if (isDrawing && shape) setShape(updateShape(shape, pos));
    socket.emit("broadcast user", room, {
      user_id: socket.id,
      username,
      pos,
      shape: { ...shape, tool },
      color,
    });
  }

  return (
    <div className="flex h-full w-full touch-none overflow-scroll bg-gray-300">
      <section className="mx-auto h-full">
        <Stage
          width={WIDTH}
          height={HEIGHT}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
          onPointerOut={handleMouseUp}
        >
          <Layer listening={false}>
            <Rect x={0} y={0} width={WIDTH} height={HEIGHT} fill="#ffffff" />
          </Layer>
          <Layer>
            <Group>
              {shapes.map((shape, i) => (
                <MyShape key={i} {...shape} />
              ))}
            </Group>
            <MyShape tool={tool} {...stagedShape} />
            <MyShape tool={tool} {...shape} />
          </Layer>
          <Layer listening={false}>
            {Object.keys(users).map((user) => {
              const userData = users[user] as UserData;
              const { username, shape, color, pos } = userData;
              return (
                <>
                  <Group {...pos}>
                    <Circle key={user} radius={7} fill={color} />
                    <Text
                      text={username}
                      fill={color}
                      fontSize={18}
                      offsetY={7}
                      offsetX={-8}
                    />
                  </Group>
                  <MyShape
                    key={user + "C"}
                    tool={shape?.tool || ""}
                    {...shape}
                  />
                </>
              );
            })}
          </Layer>
        </Stage>
      </section>
      <section className="fixed left-5 top-5 flex flex-col rounded border bg-white p-5 shadow-xl">
        <select value={tool} onChange={(e) => setTool(e.target.value as Tool)}>
          <option value="line">line</option>
          <option value="rectangle">rectangle</option>
          <option value="circle">circle</option>
          <option value="eraser">eraser</option>
        </select>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <div>
          <input
            type="range"
            min={1}
            max={100}
            value={size}
            onChange={(e) => setSize(+e.target.value)}
          />
        </div>
      </section>
    </div>
  );
}
