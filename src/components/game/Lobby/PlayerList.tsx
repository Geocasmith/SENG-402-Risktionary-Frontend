import React from "react";
import PlayerListItem from "./PlayerListItem";

interface PlayerListProps {
  players: string[];
  selectedPlayer: string | null;
  onSelect: (player: string) => void;
}

const PlayerList: React.FC<PlayerListProps> = ({ players, selectedPlayer, onSelect }) => {
  return (
    <ul className="flex flex-wrap justify-center overflow-y-auto max-h-[60vh]">
      {players.map((player) => (
        <PlayerListItem 
          key={player}
          playerName={player}
          isSelected={player === selectedPlayer}
          onSelect={onSelect}
        />
      ))}
    </ul>
  );
};

export default PlayerList;
