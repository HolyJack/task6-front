import { useEffect, useState } from "react";
import { socket } from "./socket";
import DrawingBoard from "./components/DrawingBoard";
import Preview from "./components/Previews";
import WelcomeMessage from "./components/WelcomeMsg";
import SubmitUsername from "./components/SubmitUsername";
import LeaveRoom from "./components/LeaveRoom";

export default function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [room, setRoom] = useState<string | undefined>(undefined);
  const [username, setUsername] = useState(
    sessionStorage.getItem("username") || "",
  );

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onJoinRoom(room: string) {
      setRoom(room);
    }

    socket.on("joined room", onJoinRoom);
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("joined room", onJoinRoom);
    };
  }, []);

  function submitUsername(username: string) {
    sessionStorage.setItem("username", username);
    setUsername(username);
  }

  function leaveRoom() {
    setRoom(() => {
      socket.emit("leaveroom", room);
      return undefined;
    });
  }

  if (!isConnected)
    return (
      <div className="h-screen w-screen">
        <p className="mx-auto">Awaiting Connection...</p>
      </div>
    );

  if (!room)
    return (
      <div className="flex h-screen w-screen flex-col">
        <header className="flex h-32 items-center justify-center border">
          {!username && <SubmitUsername onSubmit={submitUsername} />}
          {username && <WelcomeMessage username={username} />}
        </header>
        <main className="h-[cacl(100%-8rem)] w-screen overflow-y-auto">
          <Preview disabled={username ? false : true} />
        </main>
      </div>
    );

  return (
    <div className="flex h-screen w-screen flex-col">
      <DrawingBoard room={room} username={username} />
      <LeaveRoom onLeaveRoom={leaveRoom} />
    </div>
  );
}
