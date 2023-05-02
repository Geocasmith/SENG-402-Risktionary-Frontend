import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectVoteKey } from "./../../store";
import * as h337 from "heatmap.js";
import "./../../index.css";
import GameWordAccessor from "./../helper/GameWordAccessor";
import socket from "./../../socket";
import TopBar from "../TopBar";

interface Vote {
  risk: number;
  probability: number;
}

interface DisplayVotesProps {
  votes: Vote[];
}

const DisplayVotes: React.FC<DisplayVotesProps> = ({ votes }) => {
  const voteKey = useSelector(selectVoteKey);
  const voteName = GameWordAccessor.getGameWordNameByKey(voteKey);
  const isDrawing = localStorage.getItem("isDrawing") === "true";

  useEffect(() => {
    const heatmaps = document.querySelectorAll(".heatmap-container");
    heatmaps.forEach((heatmap) => {
      const heatmapInstance = h337.create({
        container: heatmap as HTMLElement,
        radius: 50,
        maxOpacity: 0.5,
        minOpacity: 0,
        blur: 0.75,
      });

      const dataPoints = votes.map((vote) => {
        return {
          x: vote.risk * 35,
          y: vote.probability * 35,
          value: (1 / votes.length) * 150,
        };
      });

      const data = {
        max: 100,
        min: 0,
        data: dataPoints,
      };
      heatmapInstance.setData(data);
    });
  }, [votes]);

  const handleNextButtonClick = () => {
    console.log("Next button clicked");
    socket.emit("slidebutton");
  };

  return (
    <>
      <TopBar />
    <div
      className="flex flex-col items-center justify-center"
      style={{ minHeight: "calc(100vh - 8rem)" }} // Add this style
    >
      <h1 className="text-4xl font-bold">{voteName}</h1>

      <div className="relative mb-8">
        <div
          className="absolute left-[-32px] text-center left-axis"
          style={{
            top: "50%",
            transform: "translateY(-50%) translateX(-100%) rotate(180deg)",
            writingMode: "vertical-rl",
            textOrientation: "mixed",
          }}
        >
          Probability
        </div>
        <div className="relative w-96 h-96 grid-pattern heatmap-container">
          <div className="text-center absolute bottom-[-45px] w-full">Risk</div>
          {Array.from({ length: 11 }, (_, i) => i).map((i) => (
            <React.Fragment key={i}>
              {i !== 0 && (
                <>
                  <div
                    className="absolute left-[-30px] text-center"
                    style={{
                      top: `${(10 - i) * 10}%`,
                      transform: "translateY(-50%)",
                    }}
                  >
                    {i}
                  </div>
                  <div
                    className="absolute bottom-[-30px] text-center"
                    style={{
                      left: `${i * 10}%`,
                      transform: "translateX(-50%)",
                    }}
                  >
                    {i}
                  </div>
                </>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {isDrawing && (
        <button
          onClick={handleNextButtonClick}
          className="mt-8 group relative w-half flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Next
        </button>
      )}
    </div>
    </>
  );
};

export default DisplayVotes;
