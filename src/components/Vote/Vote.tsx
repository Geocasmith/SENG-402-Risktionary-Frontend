import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectVoteKey } from "../../store";
import socket from "../../socket";
import GameWordAccessor from "../helper/GameWordAccessor";
import TopBar from "../TopBar";
import CountdownTimer from './../helper/CountdownTimer';


const Vote: React.FC = () => {
  const [risk, setRisk] = useState(5);
  const [probability, setProbability] = useState(5);
  const [drawing, setDrawing] = useState(5);
  const voteKey = useSelector(selectVoteKey);
  const voteName = GameWordAccessor.getGameWordNameByKey(voteKey);
  const [hasVoted, setHasVoted] = useState(false);
  const displayName = localStorage.getItem("displayName") || "";
  const studentId = localStorage.getItem("studentId") || "";

  // useEffect(() => {
  //   const isDrawing = localStorage.getItem("isDrawer");
  //   if (isDrawing) {
  //     setIsDrawer(JSON.parse(isDrawing));
  //   }
  // }, []);

  const handleSubmit = () => {
    setHasVoted(true);
    const voteData = {
      risk,
      probability,
      drawing,
      displayName, 
      studentId 
    };
    socket.emit("submit", voteData);
  }

  return (
    <>
        <TopBar />
        <div
            className="flex flex-col items-center justify-center bg-gray-50 relative"
            style={{ height: "calc(100vh - 8rem)" }}
        >
            <div className="absolute top-4 right-4">
                <CountdownTimer seconds={30} onTimeOut={() => console.log("time out")} />
            </div>
            <div className="container mx-auto px-4 space-y-8">
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
            className={`${
              hasVoted
                ? "bg-gray-300 hover:bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white py-2 px-4 rounded-md w-full`}
            disabled={hasVoted}
          >
            Submit
          </button>
          {/* <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md w-full"
          >
            Submit
          </button> */}
        </div>
      </div>
    </>
  );
};

export default Vote;
