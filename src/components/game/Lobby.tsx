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
  const [volunteeredPlayers, setVolunteeredPlayers] = useState<string[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const currentVoteKey = useSelector(selectVoteKey);
  const [isStudentSelected, setIsStudentSelected] = useState<boolean>(false);

  console.log("Lobby component: currentVoteKey", currentVoteKey);
  
  const displayName = localStorage.getItem("displayName") || "";
  const studentId = localStorage.getItem("studentId") || "";

  const [localStorageUpdated, setLocalStorageUpdated] = useState<boolean>(false);

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.altKey && e.code === "KeyD") {
      localStorage.setItem("isDrawing", "true");
      setLocalStorageUpdated(prev => !prev);
    }
  };
  useEffect(() => {
    localStorage.removeItem("isSelected");
  }, [dispatch, displayName]);


  useEffect(() => {
    // Emit the "returnToLobby" event
    socket.emit("returnToLobby");
    // Listen for the "game started" event
    socket.on("started", () => {
      dispatch(setGamePhase("game"));
    });
// updates player list on new player
    socket.on("updatePlayerList", (updatedPlayerList: string[]) => {
      const currentUser = localStorage.getItem("displayName");
      const filteredPlayerList = updatedPlayerList.filter((player) => player !== currentUser);
      setPlayerList(filteredPlayerList);
    });
    // Handles user volunteering
socket.on("playerVolunteered", (updatedVolunteerList: string[]) => {
  setVolunteeredPlayers(updatedVolunteerList);
});

// handles user getting selected
    socket.on("playerSelected", (selectedPlayerName: string) => {
  if (displayName === selectedPlayerName) {
    localStorage.setItem("isSelected", "true");
    setIsStudentSelected(true);
  } else {
    localStorage.setItem("isSelected", "false");
    setIsStudentSelected(false);
  }
});


  document.addEventListener("keydown", handleKeyPress);


    // Cleanup on unmount
    return () => {
      socket.off("started");
      socket.off("updatePlayerList");
      socket.off("playerSelected");
      socket.off("playerVolunteered");
      socket.off("playerDeVolunteered");
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [dispatch, displayName]);

  
  const handleVolunteerButtonClick = () => {
    if (volunteeredPlayers.includes(displayName)) {
      // If the user has already volunteered, de-volunteer
      socket.emit("devolunteer", displayName, studentId);
    } else {
      // Otherwise, volunteer
      socket.emit("volunteer", displayName, studentId);
    }
  };
  

  const handleStartButtonClick = () => {
    // Emit the "start game" event
    console.log("Start game button clicked");
    socket.emit("start", currentVoteKey);
  };

  const handleSelectButtonClick = () => {
    if (selectedPlayer) {
      socket.emit("selectPlayer", selectedPlayer);
    }
  };
  

  const isDrawing = localStorage.getItem("isDrawing") === "true";

  return (
    <>
      <TopBar />
      <div
        className="flex flex-col items-center justify-center bg-gray-50"
        style={{ height: "calc(100vh - 8em)" }}
      >
        {isStudentSelected ? (
  <div className="text-center pb-24 mt-4 text-3xl font-bold text-red-600">
    You are Selected to Draw!
  </div>
) : null}

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
        {/* // Check for the current user's name */}
<li className={`player-name ${volunteeredPlayers.includes(localStorage.getItem("displayName") || "") ? "text-green-500" : ""}`}>
  {localStorage.getItem("displayName")}
</li>

{/* // Loop through the playerList to display other players */}
{playerList.map((playerName, index) => (
  <li 
    key={index} 
    className={`player-name ${playerName === selectedPlayer ? "bg-yellow-400" : ""} ${volunteeredPlayers.includes(playerName) ? "text-green-500" : ""}`} 
    onClick={isDrawing ? () => setSelectedPlayer(playerName) : undefined}
  >
    {playerName}
  </li>
))}


      </ul>
          </div>
          {isDrawing ? (
  <>
    <button
      onClick={handleStartButtonClick}
      className="mt-8 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Start
    </button>
    <button
      onClick={handleSelectButtonClick}
      className="mt-8 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
    >
      Select
    </button>
  </>
) : (
  <button
    onClick={handleVolunteerButtonClick}
    className="mt-8 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
  >
    Volunteer
  </button>
)}


        </div>
      </div>
    </>
  );
};

export default Lobby;
