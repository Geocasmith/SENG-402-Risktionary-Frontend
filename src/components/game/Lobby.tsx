// Lobby.tsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGamePhase } from "./../../reducers/gameSlice";
import socket from "./../../socket";
import TopBar from "../TopBar";
import { getUserScore } from "./../helper/ScoreHelper";
import "./Lobby.css";
import { selectVoteKey } from "../../store";

const Lobby: React.FC = () => {
  const dispatch = useDispatch();
  const [playerList, setPlayerList] = useState<string[]>([]);
  const currentVoteKey = useSelector(selectVoteKey);
  
  const displayName = localStorage.getItem("displayName") || "";

  useEffect(() => {
    // Emit the "returnToLobby" event
    socket.emit("returnToLobby");
    // Listen for the "game started" event
    socket.on("started", () => {
      dispatch(setGamePhase("game"));
    });

    socket.on("updatePlayerList", (updatedPlayerList: string[]) => {
      const currentUser = localStorage.getItem("displayName");
      const filteredPlayerList = updatedPlayerList.filter((player) => player !== currentUser);
      setPlayerList(filteredPlayerList);
    });

    // Cleanup on unmount
    return () => {
      socket.off("started");
      socket.off("updatePlayerList");
    };
  }, [dispatch, displayName]);

  const handleStartButtonClick = () => {
    // Emit the "start game" event
    console.log("Start game button clicked");
    socket.emit("start", currentVoteKey);
  };

  const isDrawing = localStorage.getItem("isDrawing") === "true";

  return (
    <>
      <TopBar />
      <div
        className="flex flex-col items-center justify-center bg-gray-50"
        style={{ height: "calc(100vh - 8em)" }}
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Lobby
          </h2>
          <div className="text-center mt-4 text-xl font-bold text-gray-900">
            Your score: {getUserScore()}
          </div>
          <div className="player-list-container">
          <ul className="player-list">
        {/* Display the current user's name */}
        <li className="player-name">{localStorage.getItem("displayName")}</li>
        {playerList.map((playerName, index) => (
          <li key={index} className="player-name">
            {playerName}
          </li>
        ))}
      </ul>
          </div>
          {isDrawing && (
            <button
              onClick={handleStartButtonClick}
              className="mt-8 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Start
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Lobby;
