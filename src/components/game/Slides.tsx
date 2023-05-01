import React from "react";
import { useSelector } from "react-redux";
import { selectVoteKey } from "../../store";
import exampleImage from "./bus.png";
import socket from "./../../socket";
import GameWordAccessor from "./../helper/GameWordAccessor";
import TopBar from "../TopBar";

const Slides: React.FC = () => {
  const voteKey = useSelector(selectVoteKey);
  const word = GameWordAccessor.getGameWordNameByKey(voteKey);
  const description = GameWordAccessor.getGameWordDescriptionByKey(voteKey);
  const path = GameWordAccessor.getGameWordPathByKey(voteKey);
  const isDrawing = localStorage.getItem("isDrawing") === "true";

  const handleNextButtonClick = () => {
    // Emit the "start game" event
    console.log("Start game button clicked");
    socket.emit("restartbutton");
  };

  return (
    <>
    <TopBar />
    <div
        className="flex flex-col items-center justify-center bg-gray-50"
        style={{ height: "calc(100vh - 8em)" }} // Change this line
      >
        <div className="flex flex-col items-center justify-center space-y-4">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold my-4 text-center">{word}</h2>
        <div className="my-4">
          <p>{description}</p>
        </div>
        <div className="my-4">
          <img
            src={exampleImage}
            alt="Example"
            className="mx-auto w-full max-w-md"
          />
        </div>
        {isDrawing && (
        <div className="flex justify-between mt-8">
          <button
            onClick={handleNextButtonClick}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
          >
            Next
          </button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
            Summary
          </button>
        </div>
        )}
      </div>
    </div>
    </div>
    </>
  );
};

export default Slides;
