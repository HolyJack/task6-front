import { Group } from "react-konva";
import { MyShape } from "../utils/Shapes/Shape";
import { MyShapeConfigsWithTool } from "../utils/Shapes/ShapeTypes";

export function SubmitedShapes({
  shapes,
}: {
  shapes: MyShapeConfigsWithTool[];
}) {
  return (
    <Group>
      {shapes.map((shape, i) => (
        <MyShape key={i} {...shape} />
      ))}
    </Group>
  );
}
