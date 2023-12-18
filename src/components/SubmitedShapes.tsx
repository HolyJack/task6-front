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
    function onAddNewShape(shape: MyShapeConfigsWithTool) {
      updateShapes([shape]);
    }

    socket.on("add new shape", onAddNewShape);
    return () => {
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
