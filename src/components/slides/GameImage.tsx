import React, { FC } from "react";

interface GameImageProps {
    imagePath: string | undefined;
    altDescription: string | null;
  }
/**
 * GameImage Component
 * Shows the image for the current word
 */
const GameImage: FC<GameImageProps> = ({ imagePath, altDescription }) => {
    if (!imagePath || !altDescription) {
        return null;
      }
    
  return (
    <div className="my-4">
      <img
        src={imagePath}
        alt={altDescription}
        className="game-image"
      />
    </div>
  );
};

export default GameImage;
