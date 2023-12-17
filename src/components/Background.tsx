import { Layer, Rect } from "react-konva";

export default function Background() {
  return (
    <Layer listening={false}>
      <Rect
        x={0}
        y={0}
        width={innerWidth}
        height={innerHeight}
        fill="#ffffff"
      />
    </Layer>
  );
}
