import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import socket from "./../../socket";
import Lobby from "./Lobby/Lobby";
import Vote from "../Vote/Vote";
import DisplayVotes from "./../Vote/DisplayVotes";
import { selectGamePhase, setGamePhase } from "./../../reducers/gameSlice";
import Container from "./Container";
import Slides from "./../slides/Slides";

import { incrementKey, setKey, selectVoteKey } from "./../../store";
import GameBorder from "../GameBorder";
import { useNavigate } from "react-router-dom";

// Manages the different states of the game using socket.io messages to initiate updates in game state and uses redux to store the game state
//The file also contains an authentication check to ensure users are authenticated before playing the game
const Game: React.FC = () => {
  const gamePhase = useSelector(selectGamePhase);
  const dispatch = useDispatch();
  const [receivedVotes, setReceivedVotes] = useState<any[]>([]);
  const navigate = useNavigate();
  const currentVoteKey = useSelector(selectVoteKey);


  useEffect(() => {
    if (!sessionStorage.getItem("signedIn")) {
        navigate("/signup");
    }

    // Sockets for handling game state updates
    const handleStarted = (voteKey: number) => {
        console.log("Received started event with vote key:", voteKey);
        if (currentVoteKey !== voteKey) {
            console.log("Vote key is different, updating...");
            dispatch(setKey(voteKey));
        }
        dispatch(setGamePhase("game"));
    };

    const handleVote = () => {
        console.log("Received vote event");
        if (gamePhase !== 'lobby') {  
            dispatch(setGamePhase("vote"));
        }
    };

    const handleHeatmap = (votes: any[]) => {
        console.log("Received displayvotes event");
        if (gamePhase !== 'lobby') {  
            setReceivedVotes(votes);
            dispatch(setGamePhase("displayVotes"));
        }
    };

    const handleSlides = () => {
        console.log("Received slides event");
        if (gamePhase !== 'lobby') {  
            dispatch(setGamePhase("slides"));
        }
    };

    const handleRestart = () => {
        console.log("Received restart event");
        dispatch(incrementKey());
        setReceivedVotes([]);
        dispatch(setGamePhase("lobby"));
    };

    // On each socket message recieved, update the game state and handle changes
    socket.on("started", handleStarted);
    socket.on("vote", handleVote);
    socket.on("heatmap", handleHeatmap);
    socket.on("slides", handleSlides);
    socket.on("restart", handleRestart);

    return () => {
        socket.off("started", handleStarted);
        socket.off("vote", handleVote);
        socket.off("heatmap", handleHeatmap);
        socket.off("slides", handleSlides);
        socket.off("restart", handleRestart);
    };
}, [dispatch, navigate, gamePhase, currentVoteKey]);


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
