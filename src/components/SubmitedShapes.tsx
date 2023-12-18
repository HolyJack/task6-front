import { Group } from "react-konva";
import { MyShape } from "../utils/Shapes/Shape";
import { MyShapeConfigsWithTool } from "../utils/Shapes/ShapeTypes";
import { useEffect } from "react";
import { socket } from "../socket";

export function SubmitedShapes({
  shapes,
  updateShapes,
  room,
}: {
  shapes: MyShapeConfigsWithTool[];
  updateShapes: (shapes: MyShapeConfigsWithTool[]) => void;
  room: string;
}) {
  useEffect(() => {
    function onInitialShapes(shapes: MyShapeConfigsWithTool[]) {
      updateShapes(shapes);
    }

    function onAddNewShape(shape: MyShapeConfigsWithTool) {
      updateShapes([shape]);
    }

    socket.emit("initial shapes", room);
    socket.on("initial shapes", onInitialShapes);
    socket.on("add new shape", onAddNewShape);
    return () => {
      socket.off("initial shapes", onInitialShapes);
      socket.off("add new shape", onAddNewShape);
    };
  }, [room, updateShapes]);

  return (
    <Group>
      {shapes.map((shape, i) => (
        <MyShape key={i} {...shape} />
      ))}
    </Group>
  );
}
