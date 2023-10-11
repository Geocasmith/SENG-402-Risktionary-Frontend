import React from "react";

interface PlayerListItemProps {
  playerName: string;
  isSelected: boolean;
  onSelect: (player: string) => void;
}

const PlayerListItem: React.FC<PlayerListItemProps> = ({ playerName, isSelected, onSelect }) => {
  return (
    <li 
      className={`text-1.5xl font-bold m-2 ${isSelected ? "bg-yellow-400" : ""}`}
      onClick={() => onSelect(playerName)}
    >
      {playerName}
    </li>
  );
};

export default PlayerListItem;
