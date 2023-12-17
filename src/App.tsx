import { useEffect, useState } from "react";
import { socket } from "./socket";
import { MyShapeConfigsWithTool } from "./utils/Shapes/ShapeTypes";
import DrawingBoard from "./components/DrawingBoard";
import RoomJoinButton from "./components/RoomJoinButton";

const ROOMS = ["room1", "room2", "room3", "room4", "room5"];

export default function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [room, setRoom] = useState<string | undefined>(undefined);
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

    function onPreview(allShapes: Record<string, MyShapeConfigsWithTool[]>) {
      setPreview(allShapes);
    }

    function onJoinRoom(room: string) {
      setRoom(room);
    }

    socket.on("joined room", onJoinRoom);
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("preview", onPreview);
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("preview", onPreview);
      socket.off("joined room", onJoinRoom);
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
          <DrawingBoard room={room} username={username} />
          <button
            className="fixed right-5 top-5 h-10 w-40 border bg-white shadow"
            onClick={leaveRoom}
          >
            Leave room
          </button>
        </>
      )}
    </div>
  );
}
