import { io } from "socket.io-client";

const URL = "https://ancient-fortress-01607-9de125cb985f.herokuapp.com";

export const socket = io(URL);
