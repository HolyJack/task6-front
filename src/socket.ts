import { io } from "socket.io-client";

const URL = "https://drawing-board-backend-8fb2e38f4ebb.herokuapp.com";

export const socket = io(URL);
