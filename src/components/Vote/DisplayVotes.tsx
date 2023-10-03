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
          x: vote.risk >= 3 ? (1 + vote.risk) * 35 : vote.risk * 30,
          y: vote.probability >= 5 ? (11 - vote.probability) * 35 : (12 - vote.probability) * 35,
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
        style={{ minHeight: "calc(100vh - 8rem)" }}
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
            
            {Array.from({ length: 5 }, (_, i) => i + 1).map((i) => (
                Array.from({ length: 4 }, (_, j) => j + 1).map((j) => {
                    const multiplier = i * j;
                    let bgColor;
                    if (multiplier <= 3) {
                      bgColor = 'rgba(0, 255, 0, 0.2)'; 
                    } else if (multiplier <= 7) {
                      bgColor = 'rgba(255, 255, 0, 0.2)'; 
                    } else if (multiplier <= 9) {
                      bgColor = 'rgba(255, 165, 0, 0.2)'; 
                    } else {
                      bgColor = 'rgba(255, 0, 0, 0.2)'; 
                    }
                    return (
                        <React.Fragment key={`fragment-${i}-${j}`}>
                            <div
                                className="absolute flex items-center justify-center"
                                style={{
                                    top: `${(5 - i) * 20}%`,
                                    left: `${j * 25 - 25}%`,
                                    width: '25%',
                                    height: '20%',
                                    backgroundColor: bgColor,
                                    zIndex: 1
                                }}
                            >
                                <span className="text-lg font-bold z-2">{multiplier}</span>
                            </div>
                        </React.Fragment>
                    );
                })
            ))}

{Array.from({ length: 6 }, (_, i) => i).map((i) => (
  <React.Fragment key={i}>
    {i !== 0 && (
      <>
        <div
          className="absolute left-[-30px] text-center"
          style={{
            top: `${(5 - i) * 20 + 10}%`,
            transform: "translateY(-50%)",
            zIndex: 3
          }}
        >
          {i}
        </div>
        {i <= 4 && (
          <div
            className="absolute bottom-[-30px] text-center"
            style={{
              left: `${i * 25 - 12.5}%`,
              transform: "translateX(-50%)",
              zIndex: 3
            }}
          >
            {i}
          </div>
        )}
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