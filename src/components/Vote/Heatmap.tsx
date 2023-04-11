import React from "react";
import { useSelector } from "react-redux";
import { selectVoteKey } from "./../../store";
import * as h337 from "heatmap.js";
import "./../../index.css";
import GameWordAccessor from "./../helper/GameWordAccessor";

interface Vote {
  risk: number;
  probability: number;
}
const DisplayVotes: React.FC = () => {
  const voteKey = useSelector(selectVoteKey);
  const voteName = GameWordAccessor.getGameWordNameByKey(voteKey);


  React.useEffect(() => {
    const heatmaps = document.querySelectorAll(".heatmap-container");
    heatmaps.forEach((heatmap) => {
      const heatmapInstance = h337.create({
        container: heatmap as HTMLElement,
        radius: 50,
        maxOpacity: 0.5,
        minOpacity: 0,
        blur: 0.75,
      });

      const data = {
        max: 100,
        min: 0,
        data: [
          { x: 10, y: 0, value: 100 },
          { x: 30, y: 400, value: 80 },
          { x: 400, y: 0, value: 20 },
          { x: 400, y: 400, value: 80 },
          { x: 200, y: 200, value: 100 },
        ],
      };
      heatmapInstance.setData(data);
    });
  }, []);

  return (
    <div className="flex flex-col items-center space-y-10">
      <h1 className="text-4xl font-bold">{voteName}</h1>

      <div className="flex items-center space-x-4">
        <p>Probability</p>
        <div className="relative w-96 h-96 grid-pattern heatmap-container">
          <div className="text-center absolute bottom-[-24px] w-full">Risk</div>
        </div>
      </div>
    </div>
  );
};

export default DisplayVotes;
