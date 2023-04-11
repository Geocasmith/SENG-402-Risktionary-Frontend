import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import socket from "./../../socket";

// const socket = io('http://localhost:3001');

interface Vote {
  risk: number;
  probability: number;
  drawing: number;
}

interface DisplayVotesProps {
  votes: Vote[];
}

const DisplayVotes: React.FC<DisplayVotesProps> = ({ votes }) => {
  // const [votes, setVotes] = useState<Vote[]>([]);

  const handleNextButtonClick = () => {
    // Emit the "start game" event
    console.log("Start game button clicked");
    socket.emit("slidebutton");
  };

  // useEffect(() => {
  //   socket.on('displayVotes', (votes: Vote[]) => {
  //     setVotes(votes);
  //   });

  //   return () => {
  //     socket.off('displayVotes');
  //   };
  // }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">

    <div className="container mx-auto px-4">
      <h2 className="text-4xl font-bold my-4 text-center">Votes</h2>
      <div>
        {votes.map((vote, index) => (
          <div key={index}>
            <p>Risk: {vote.risk}</p>
            <p>Probability: {vote.probability}</p>
            <p>Drawing: {vote.drawing}</p>
            <hr />
          </div>
        ))}
      </div>
      <button
        onClick={handleNextButtonClick}
        className="mt-8 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Next
      </button>
    </div>
    </div>
  );
};

export default DisplayVotes;
