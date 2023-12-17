import { useEffect, useState } from "react";
import { socket } from "./socket";
import { MyShapeConfigsWithTool } from "./utils/Shapes/ShapeTypes";
import DrawingBoard from "./components/DrawingBoard";
import RoomJoinButton from "./components/RoomJoinButton";

const ROOMS = ["room1", "room2", "room3", "room4", "room5"];

export default function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [room, setRoom] = useState<string | undefined>(undefined);
  const [shapes, setShapes] = useState<MyShapeConfigsWithTool[]>([]);
  const [preview, setPreview] = useState<
    Record<string, MyShapeConfigsWithTool[]>
  >({});
  const [username, setUsername] = useState(
    sessionStorage.getItem("username") || "",
  );
  const [enteredname, setEnteredname] = useState("");

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onInit(value: MyShapeConfigsWithTool[]) {
      setShapes(value);
    }

    function onUpdate(shapes: MyShapeConfigsWithTool[]) {
      setShapes(shapes);
    }

    function onJoinRoom(room: string, shape: MyShapeConfigsWithTool[]) {
      setShapes(shape);
      setRoom(room);
    }

    function onPreview(allShapes: Record<string, MyShapeConfigsWithTool[]>) {
      setPreview(allShapes);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("init", onInit);
    socket.on("update shapes", onUpdate);
    socket.on("joined room", onJoinRoom);
    socket.on("preview", onPreview);
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("init", onInit);
      socket.off("update shapes", onUpdate);
      socket.off("joined room", onJoinRoom);
      socket.off("preview", onPreview);
    };
  }, []);

  function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    sessionStorage.setItem("username", enteredname);
    setUsername(enteredname);
    setEnteredname("");
  }

  function leaveRoom() {
    if (room) {
      setRoom(() => {
        socket.emit("leave room", room);
        return undefined;
      });
    }
  }

  return (
    <div className="flex h-screen w-screen flex-col">
      {isConnected && !room && !username && (
        <div className="flex w-full justify-center p-10">
          <form onSubmit={submitForm} className=" flex gap-2">
            <input
              type="text"
              className="border p-2 shadow"
              value={enteredname}
              onChange={(e) => setEnteredname(e.target.value)}
              placeholder="Enter your username"
            />
            <button
              type="submit"
              className="h-10 w-20 border shadow hover:bg-black/10"
            >
              OK
            </button>
          </form>
        </div>
      )}
      {isConnected && !room && username && (
        <div className="flex w-full justify-center p-10">
          <h2 className="text-xl">{`Welcome ${username}!`}</h2>
        </div>
      )}
      {isConnected && !room && (
        <div className="flex h-full flex-wrap justify-evenly gap-5 p-10">
          {ROOMS.map((room) => (
            <RoomJoinButton
              key={room}
              value={room}
              room={room}
              shapes={preview[room] || []}
              className="aspect-square h-72 border shadow"
              disabled={!username}
            />
          ))}
        </div>
      )}
      {isConnected && room && (
        <>
          <button
            className="fixed right-5 top-5 h-10 w-40 border bg-white shadow"
            onClick={leaveRoom}
          >
            Leave room
          </button>
          <DrawingBoard
            room={room}
            shapes={shapes}
            users={users}
            username={username}
          />
        </>
      )}
    </div>
  );
}
