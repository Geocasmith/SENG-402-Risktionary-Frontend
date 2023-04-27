
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { setGamePhase } from "./../../reducers/gameSlice";
import socket from "./../../socket";
import TopBar from "../TopBar";

const Lobby: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Listen for the "game started" event
    socket.on("started", () => {
      dispatch(setGamePhase("game"));
    });

    // Cleanup on unmount
    return () => {
      socket.off("started");
    };
  }, [dispatch]);

  const handleStartButtonClick = () => {
    // Emit the "start game" event
    console.log("Start game button clicked");
    socket.emit("start");
  };

  return (
    <>
      <TopBar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Lobby
        </h2>
        <button
          onClick={handleStartButtonClick}
          className="mt-8 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Start
        </button>
      </div>
    </>
  );
};

export default Lobby;
