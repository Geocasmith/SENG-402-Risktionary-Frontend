import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectVoteKey } from "../../store";
import socket from "../../socket";
import GameWordAccessor from "../helper/GameWordAccessor";
import TopBar from "../TopBar";
import CountdownTimer from './../helper/CountdownTimer';

const Vote: React.FC = () => {
  const [risk, setRisk] = useState(2); // Renamed to severity for clarity
  const [probability, setProbability] = useState(3);
  const voteKey = useSelector(selectVoteKey);
  const voteName = GameWordAccessor.getGameWordNameByKey(voteKey);
  const [hasVoted, setHasVoted] = useState(false);
  const displayName = localStorage.getItem("displayName") || "";
  const studentId = localStorage.getItem("studentId") || "";

  const severityLabels = ["Negligible", "Minor", "Critical", "Catastrophic"];
  const probabilityLabels = ["Improbable", "Remote", "Occasional", "Probable", "Frequent"];

  const handleSubmit = () => {
    setHasVoted(true);
    const voteData = {
      risk: risk*2, // This remains 'risk' to ensure the backend receives the same data structure
      probability: probability*2,
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
                    <h3 className="text-xl font-semibold mb-2">Severity</h3>
                    <div className="flex justify-between">
                        {severityLabels.map((label, index) => (
                            <span key={index}>{label}</span>
                        ))}
                    </div>
                    <input
                        type="range"
                        min="1"
                        max="4"
                        value={risk}
                        onChange={(e) => setRisk(parseInt(e.target.value))}
                        className="w-full"
                    />
                </div>
                <div className="my-4">
                    <h3 className="text-xl font-semibold mb-2">Probability</h3>
                    <div className="flex justify-between">
                        {probabilityLabels.map((label, index) => (
                            <span key={index}>{label}</span>
                        ))}
                    </div>
                    <input
                        type="range"
                        min="1"
                        max="5"
                        value={probability}
                        onChange={(e) => setProbability(parseInt(e.target.value))}
                        className="w-full"
                    />
                </div>
                <button
                    onClick={handleSubmit}
                    className={`${
                        hasVoted
                            ? "bg-gray-300 hover:bg-gray-300 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-green-600"
                    } text-white py-2 px-4 rounded-md w-full`}
                    disabled={hasVoted}
                >
                    Cast Vote!
                </button>
            </div>
        </div>
    </>
  );
};

export default Vote;