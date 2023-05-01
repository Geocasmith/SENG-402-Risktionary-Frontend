// socket.ts
import { io } from "socket.io-client";
import { getSocketConnectionConfig } from "./config";

const { url, options } = getSocketConnectionConfig();
const socket = io(url, options);

export default socket;