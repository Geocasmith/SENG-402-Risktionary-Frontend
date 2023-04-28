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
import DisplayVotes from "./components/Vote/DisplayVotes";

function App() {
  return (
    <div>
      <Game />
    </div>
  );
}

export default App;
