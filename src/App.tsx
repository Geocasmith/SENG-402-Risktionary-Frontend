// // src/App.tsx
// import React from "react";
// import "./App.css";
// import DrawingCanvas from "./components/game/DrawingCanvas";
// import ChatBox from "./components/game/Chatbox";

// function App() {
//   return (
//     <div style={{ display: "flex" }}>
//       <DrawingCanvas />
//       <ChatBox />
//     </div>
//   );
// }

// export default App;

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import Lobby from "./components/game/Lobby";
import Game from "./components/game/Game";
import Vote from "./components/Vote/Vote";

function App() {
  const gamePhase = useSelector((state: RootState) => state.game.gamePhase);

  return (
    <div>
      {gamePhase === "lobby" && <Lobby />}
      {gamePhase === "game" && <Game />}
      {gamePhase === "vote" && <Vote />}
    </div>
  );
}

export default App;
