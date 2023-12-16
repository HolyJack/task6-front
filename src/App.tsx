import { useEffect, useState } from "react";
import { socket } from "./socket";
import {
  CursorPosition,
  MyShapeConfigsWithTool,
} from "./utils/Shapes/ShapeTypes";
import DrawingBoard from "./components/DrawingBoard";
import RoomJoinButton from "./components/RoomJoinButton";

export type UserData = {
  username: string;
  shape?: MyShapeConfigsWithTool;
  color: string;
  pos: CursorPosition;
};

export type Users = Record<string, UserData>;

const ROOMS = ["room1", "room2", "room3", "room4"];

export default function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [room, setRoom] = useState<string | undefined>(undefined);
  const [shapes, setShapes] = useState<MyShapeConfigsWithTool[]>([]);
  const [preview, setPreview] = useState<
    Record<string, MyShapeConfigsWithTool[]>
  >({});
  const [users, setUsers] = useState<Users>({});
  const [username, setUsername] = useState("");
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

    function onBroadcastUsers(users: Users) {
      delete users[socket.id];
      setUsers(users);
    }

    function onJoinRoom(room: string, shape: MyShapeConfigsWithTool[]) {
      setShapes(shape);
      setRoom(room);
      setPreview({});
    }

    function onPreview(allShapes: Record<string, MyShapeConfigsWithTool[]>) {
      setPreview(allShapes);
    }

    socket.on("connect", onConnect);
    socket.on("init", onInit);
    socket.on("disconnect", onDisconnect);
    socket.on("update shapes", onUpdate);
    socket.on("broadcast users", onBroadcastUsers);
    socket.on("joined room", onJoinRoom);
    socket.on("preview", onPreview);
    return () => {
      socket.off("connect", onConnect);
      socket.off("init", onInit);
      socket.off("disconnect", onDisconnect);
      socket.off("update shapes", onUpdate);
      socket.off("broadcast users", onBroadcastUsers);
      socket.off("joined room", onJoinRoom);
    };
  }, []);

  function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setUsername(e.currentTarget.value);
    setEnteredname("");
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
            <button type="submit" className="h-10 w-20">
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
        <DrawingBoard
          room={room}
          shapes={shapes}
          users={users}
          username={username}
        />
      )}
    </div>
  );
}
