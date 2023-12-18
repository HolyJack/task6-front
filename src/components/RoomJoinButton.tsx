import { ButtonHTMLAttributes, useEffect, useRef, useState } from "react";
import { Layer, Rect, Stage } from "react-konva";
import { MyShape } from "../utils/Shapes/Shape";
import { HEIGHT, WIDTH } from "./DrawingBoard";
import { socket } from "../socket";
import { MyShapeConfigsWithTool } from "../utils/Shapes/ShapeTypes";

type RoomJoinButtonProps = {
  initialShapes: MyShapeConfigsWithTool[];
  room: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function RoomJoinButton({
  initialShapes,
  room,
  ...props
}: RoomJoinButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [shapes, setShapes] = useState(initialShapes);

  function joinRoom() {
    socket.emit("join room", room);
  }

  useEffect(() => {
    function onUpdatePreview(shape: MyShapeConfigsWithTool) {
      setShapes((prev) => prev.concat([shape]));
    }
    socket.on(`update preview ${room}`, onUpdatePreview);
    return () => {
      socket.off(`update preview ${room}`, onUpdatePreview);
    };
  }, [room]);

  useEffect(() => {
    setHeight(ref.current?.clientHeight || 0);
    setWidth(ref.current?.clientWidth || 0);
  }, [ref]);

  return (
    <button {...props} ref={ref} onClick={joinRoom}>
      <Stage
        height={width}
        width={height}
        scaleX={height / HEIGHT}
        scaleY={width / WIDTH}
      >
        <Layer listening={false}>
          <Rect x={0} y={0} width={width} height={height} fill="#ffffff" />
          {shapes && shapes.map((shape, i) => <MyShape key={i} {...shape} />)}
        </Layer>
      </Stage>
    </button>
  );
}
