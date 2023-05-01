// socket.ts
import { io } from "socket.io-client";

// const socket = io("http://localhost:3001");
// const socket = io("https://132.181.18.66:3001");
const socket = io("https://csse-risk1.canterbury.ac.nz:3001", { secure: true, transports: ['websocket'] });


export default socket;
