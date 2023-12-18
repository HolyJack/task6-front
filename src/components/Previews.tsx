import { useEffect, useState } from "react";
import RoomJoinButton from "./RoomJoinButton";
import { socket } from "../socket";
import { MyShapeConfigsWithTool } from "../utils/Shapes/ShapeTypes";

export default function Preview({ disabled }: { disabled: boolean }) {
  const [initialData, setInitialData] = useState<
    Record<string, MyShapeConfigsWithTool[]>
  >({});

  useEffect(() => {
    function onInitialPreview(
      initialData: Record<string, MyShapeConfigsWithTool[]>,
    ) {
      setInitialData(initialData);
    }

    socket.on("initial preview", onInitialPreview);
    socket.emit("get initial preview");

    return () => {
      socket.off("initial preview", onInitialPreview);
    };
  }, []);

  return (
    <div className="flex h-full flex-wrap justify-evenly gap-5 p-10">
      {Object.keys(initialData).map((room) => (
        <RoomJoinButton
          key={room}
          value={room}
          room={room}
          initialShapes={initialData[room]}
          className="aspect-square h-72 border shadow"
          disabled={disabled}
        />
      ))}
    </div>
  );
}
