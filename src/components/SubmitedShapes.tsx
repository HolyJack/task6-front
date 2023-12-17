import { Group } from "react-konva";
import { MyShape } from "../utils/Shapes/Shape";
import { MyShapeConfigsWithTool } from "../utils/Shapes/ShapeTypes";
import { useEffect, useState } from "react";
import { socket } from "../socket";

export function SubmitedShapes() {
  const [shapes, setShapes] = useState<MyShapeConfigsWithTool[]>([]);

  useEffect(() => {
    function onUpdate(shapes: MyShapeConfigsWithTool[]) {
      setShapes(shapes);
    }

    socket.on("update shapes", onUpdate);
    return () => {
      socket.off("update shapes", onUpdate);
    };
  }, []);
  return (
    <Group>
      {shapes.map((shape, i) => (
        <MyShape key={i} {...shape} />
      ))}
    </Group>
  );
}
