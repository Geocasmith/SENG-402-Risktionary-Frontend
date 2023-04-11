import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectVoteKey } from "./../../store";
import socket from "./../../socket";
import GameWordAccessor from "./../helper/GameWordAccessor";
import TopBar from "../TopBar";

const Vote: React.FC = () => {
  const [risk, setRisk] = useState(5);
  const [probability, setProbability] = useState(5);
  const [drawing, setDrawing] = useState(5);
  const voteKey = useSelector(selectVoteKey);
  const voteName = GameWordAccessor.getGameWordNameByKey(voteKey);

  const handleSubmit = () => {
    const voteData = {
      risk,
      probability,
      drawing,
    };

    // Emit the "submitVote" event with the vote data
    socket.emit("submit", voteData);

    fetch("/vote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(voteData),
      //TODO: add in user data
    });
  };

  return (
    <>
      <TopBar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold my-4 text-center">{voteName}</h2>
          <div className="my-4">
            <div className="flex justify-between">
              <span>Low Risk</span>
              <span>High Risk</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={risk}
              onChange={(e) => setRisk(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
          <div className="my-4">
            <div className="flex justify-between">
              <span>Low Probability</span>
              <span>High Probability</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={probability}
              onChange={(e) => setProbability(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
          <div className="my-4">
            <div className="flex justify-between">
              <span>Bad Drawing</span>
              <span>Good Drawing</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={drawing}
              onChange={(e) => setDrawing(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md w-full"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default Vote;
