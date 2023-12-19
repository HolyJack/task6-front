import { Layer, Stage } from "react-konva";
import { useEffect, useRef, useState } from "react";
import { KonvaEventObject } from "konva/lib/Node";
import { socket } from "../socket";
import TypedShapeMap, { MyShape, Tool } from "../utils/Shapes/Shape";
import {
  MyShapeConfigs,
  MyShapeConfigsWithTool,
} from "../utils/Shapes/ShapeTypes";
import OtherUsers from "./OtherUsers";
import Background from "./Background";
import { SubmitedShapes } from "./SubmitedShapes";
import Konva from "konva";
import Toolbar from "./Toolbar/Toolbar";

export const WIDTH = 1024;
export const HEIGHT = 1024;

export default function DrawingBoard({
  username,
  room,
}: {
  username: string;
  room: string;
}) {
  const isDrawing = useRef(false);
  const ref = useRef<Konva.Stage>(null);
  const [tool, setTool] = useState<Tool>("line");
  const [color, setColor] = useState<string>("#000000");
  const [size] = useState<number>(5);
  const [shape, setShape] = useState<MyShapeConfigs | undefined>();
  const [shapes, setShapes] = useState<MyShapeConfigsWithTool[]>([]);
  const { init: initShape, update: updateShape } = TypedShapeMap[tool as Tool];

  useEffect(() => {
    function onInitialShapes(shapes: MyShapeConfigsWithTool[]) {
      setShapes(shapes);
    }
    socket.emit("initial shapes", room);
    socket.on("initial shapes", onInitialShapes);
    return () => {
      socket.off("initial shapes", onInitialShapes);
    };
  }, [room]);

  function submitShape(shape: MyShapeConfigsWithTool) {
    socket.emit("new shape", room, shape);
  }

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
    shape && setShapes((prev) => prev.concat([{ ...shape, tool }]));
    setShape(undefined);
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

  function exportStage() {
    const dataURL = ref.current?.toDataURL();
    const link: HTMLAnchorElement = document.createElement("a");
    if (!link || !dataURL) return;
    link.href = dataURL;
    link.download = `${room}-${Date.now()}`;
    link.click();
  }

  return (
    <div className="flex h-full w-full touch-none overflow-scroll bg-gray-400">
      <div className="mx-auto flex h-fit w-fit items-center justify-center p-40">
        <section className="h-[1024px] w-[1024px] touch-none">
          <Stage
            ref={ref}
            width={WIDTH}
            height={HEIGHT}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseOut={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchMove={handleMouseMove}
            onTouchEnd={handleMouseUp}
            onPointerOut={handleMouseUp}
            className="cursor-crosshair"
          >
            <Background />
            <Layer listening={false}>
              <SubmitedShapes
                room={room}
                shapes={shapes}
                updateShapes={(shapes: MyShapeConfigsWithTool[]) =>
                  setShapes((prev) => prev.concat(shapes))
                }
              />
              <MyShape tool={tool} {...shape} />
            </Layer>
            <OtherUsers />
          </Stage>
        </section>
      </div>
      <Toolbar
        setTool={setTool}
        setColor={setColor}
        color={color}
        exportFunc={exportStage}
      />
    </div>
  );
}
