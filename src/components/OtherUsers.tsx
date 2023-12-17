import { useEffect, useState } from "react";
import { Circle, Group, Layer, Text } from "react-konva";
import { MyShape } from "../utils/Shapes/Shape";
import {
  CursorPosition,
  MyShapeConfigsWithTool,
} from "../utils/Shapes/ShapeTypes";
import { socket } from "../socket";

export type UserData = {
  username: string;
  shape?: MyShapeConfigsWithTool;
  color: string;
  pos: CursorPosition;
};

export type Users = Record<string, UserData>;

export default function OtherUsers() {
  const [users, setUsers] = useState<Users>({});

  useEffect(() => {
    function onBroadcastUsers(users: Users) {
      delete users[socket.id];
      setUsers(users);
    }

    socket.on("broadcast users", onBroadcastUsers);
    return () => {
      socket.off("broadcast users", onBroadcastUsers);
    };
  }, []);

  return (
    <Layer listening={false}>
      {Object.keys(users).map((user) => {
        const userData = users[user] as UserData;
        const { username, shape, color, pos } = userData;
        return (
          <>
            <Group {...pos}>
              <Circle key={user} radius={7} fill={color} />
              <Text
                text={username}
                fill={color}
                fontSize={18}
                offsetY={7}
                offsetX={-8}
              />
            </Group>
            <MyShape key={user + "C"} tool={shape?.tool || ""} {...shape} />
          </>
        );
      })}
    </Layer>
  );
}
