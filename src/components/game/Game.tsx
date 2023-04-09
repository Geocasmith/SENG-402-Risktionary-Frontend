// // src/App.tsx
// import React from "react";
// // import "./App.css";
// import DrawingCanvas from "./DrawingCanvas";
// import ChatBox from "./Chatbox";

// function Game() {
//   return (
//     <div style={{ display: "flex" }}>
//       <DrawingCanvas />
//       <ChatBox />
//     </div>
//   );
// }

// export default Game;
// src/components/game/Game.tsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";
import Lobby from "./Lobby";
import DrawingCanvas from "./DrawingCanvas";
import ChatBox from "./Chatbox";
import Vote from "../Vote/Vote";
import { selectGamePhase, setGamePhase } from './../../reducers/gameSlice';

const socket = io("http://localhost:3001");

const Game: React.FC = () => {
  const gamePhase = useSelector(selectGamePhase);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("started", () => {
      dispatch(setGamePhase("game"));
    });

    socket.on("end", () => {
      dispatch(setGamePhase("vote"));
    });

    // Cleanup on unmount
    return () => {
      socket.off("started");
      socket.off("end");
    };
  }, [dispatch]);

  return (
    <div>
      {gamePhase === "lobby" && <Lobby />}
      {gamePhase === "game" && (
        <div style={{ display: "flex" }}>
          <DrawingCanvas />
          <ChatBox />
        </div>
      )}
      {gamePhase === "vote" && <Vote />}
    </div>
  );
};

export default Game;
