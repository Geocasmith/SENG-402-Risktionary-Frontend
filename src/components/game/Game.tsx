import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import socket from "./../../socket";
import Lobby from "./Lobby";
import Vote from "../Vote/Vote";
import DisplayVotes from "./../Vote/DisplayVotes";
import { selectGamePhase, setGamePhase } from "./../../reducers/gameSlice";
import Container from "./Container";
import Slides from "./Slides";
import { incrementKey } from "./../../store";
import GameBorder from "../GameBorder";

const Game: React.FC = () => {
  const gamePhase = useSelector(selectGamePhase);
  const dispatch = useDispatch();
  const [receivedVotes, setReceivedVotes] = useState<any[]>([]);

  useEffect(() => {
    const handleStarted = () => {
      dispatch(setGamePhase("game"));
    };

    const handleVote = () => {
      console.log("Received vote event");
      dispatch(setGamePhase("vote"));
    };

    const handleHeatmap = (votes: any[]) => {
      console.log("Received displayvotes event");
      setReceivedVotes(votes);
      dispatch(setGamePhase("displayVotes"));
    };

    const handleSlides = () => {
      console.log("Received slides event");
      dispatch(setGamePhase("slides"));
    };

    const handleRestart = () => {
      console.log("Received restart event");
      dispatch(incrementKey());
      setReceivedVotes([]); // <-- Clear receivedVotes on restart
      dispatch(setGamePhase("lobby"));
    };

    socket.on("started", handleStarted);
    socket.on("vote", handleVote);
    socket.on("heatmap", handleHeatmap);
    socket.on("slides", handleSlides);
    socket.on("restart", handleRestart);

    // Cleanup on unmount
    return () => {
      socket.off("started", handleStarted);
      socket.off("vote", handleVote);
      socket.off("heatmap", handleHeatmap);
      socket.off("slides", handleSlides);
      socket.off("restart", handleRestart);
    };
  }, []); // <-- Remove dispatch from the dependency array

  return (
    <div>
      <GameBorder>
        {gamePhase === "lobby" && <Lobby />}
        {gamePhase === "game" && <Container />}
        {gamePhase === "vote" && <Vote />}
        {gamePhase === "displayVotes" && <DisplayVotes votes={receivedVotes} />}
        {gamePhase === "slides" && <Slides />}
      </GameBorder>
    </div>
  );
};

export default Game;
