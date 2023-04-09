import React from 'react';
import { useSelector } from 'react-redux';
import { selectVoteName } from "./../../store";
import * as h337 from 'heatmap.js';

const DisplayVotes: React.FC = () => {
  const voteName = useSelector(selectVoteName);

  React.useEffect(() => {
    const heatmaps = document.querySelectorAll('.heatmap-container');
    heatmaps.forEach((heatmap) => {
      const heatmapInstance = h337.create({
        container: heatmap as HTMLElement,
        radius: 50,
        maxOpacity: 0.5,
        minOpacity: 0,
        blur: 0.75,
      });

      // Example data points
      const data = {
        max: 100,
        min: 0,
        data: [
          { x: 10, y: 5, value: 100 },
          { x: 30, y: 5, value: 80 },
          { x: 50, y: 5, value: 60 },
          { x: 70, y: 5, value: 40 },
          { x: 90, y: 5, value: 20 },
        ],
      };
      heatmapInstance.setData(data);
    });
  }, []);

  return (
    <div className="flex flex-col items-center space-y-10">
      <h1 className="text-4xl font-bold">{voteName}</h1>

      <div className="flex items-center space-x-4">
        <p>Low Risk</p>
        <div className="relative w-64 h-10 heatmap-container"></div>
        <p>High Risk</p>
      </div>

      <div className="flex items-center space-x-4">
        <p>Low Probability</p>
        <div className="relative w-64 h-10 heatmap-container"></div>
        <p>High Probability</p>
      </div>
    </div>
  );
};

export default DisplayVotes;
