import React, { FC } from "react";
import socket from "./../../socket";

/**
 * NextButton Component
 * Next button for the teacher to move back to lobby
 */
const NextButton: FC = () => {
  const isDrawing = localStorage.getItem("isDrawing") === "true";

  const handleNextButtonClick = () => {
    console.log("Start game button clicked");
    socket.emit("restartbutton");
  };

  return (
    <>
      {isDrawing && (
        <div className="flex justify-between mt-8">
          <button
            onClick={handleNextButtonClick}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default NextButton;
