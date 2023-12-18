import { Group } from "react-konva";
import { MyShape } from "../utils/Shapes/Shape";
import { MyShapeConfigsWithTool } from "../utils/Shapes/ShapeTypes";
import { useEffect, useState } from "react";
import { socket } from "../socket";

export function SubmitedShapes({ room }: { room: string }) {
  const [shapes, setShapes] = useState<MyShapeConfigsWithTool[]>([]);

  useEffect(() => {
    function onInitialShapes(shapes: MyShapeConfigsWithTool[]) {
      setShapes(shapes);
    }

    function onAddNewShape(shape: MyShapeConfigsWithTool) {
      setShapes((prev) => prev.concat([shape]));
    }

    socket.emit("initial shapes", room);
    socket.on("initial shapes", onInitialShapes);
    socket.on("add new shape", onAddNewShape);
    return () => {
      socket.off("initial shapes", onInitialShapes);
      socket.off("add new shape", onAddNewShape);
    };
  }, [room]);

  return (
    <Group>
      {shapes.map((shape, i) => (
        <MyShape key={i} {...shape} />
      ))}
    </Group>
  );
}
