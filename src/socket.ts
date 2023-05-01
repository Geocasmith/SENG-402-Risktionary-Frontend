// socket.ts
import { io } from "socket.io-client";

// const socket = io("http://localhost:3001");
// const socket = io("https://132.181.18.66:3001");
const socket = io("wss://132.181.18.66:3001");

export default socket;
