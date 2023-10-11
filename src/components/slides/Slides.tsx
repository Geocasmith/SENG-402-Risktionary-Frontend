import React, { FC } from "react";
import { useSelector } from "react-redux";
import { selectVoteKey } from "../../store";
import GameWordAccessor from "./../helper/GameWordAccessor";
import TopBar from "../TopBar";
import GameImage from "./GameImage";
import NextButton from "./NextButton";

/**
 * Slides Component
 * Slide describing the risk, impact and mitigation strategies
 */
const Slides: FC = () => {
  const voteKey = useSelector(selectVoteKey);
  const word = GameWordAccessor.getGameWordNameByKey(voteKey);
  const description = GameWordAccessor.getGameWordDescriptionByKey(voteKey);
  const imagePath = GameWordAccessor.getGameWordPathByKey(voteKey);

  if (!imagePath || !word) {
    return null;
  }

  return (
    <>
      <TopBar />
      <main className="game-slide-container">
        <h2 className="game-word">{word}</h2>
        
        <div className="my-4">
          <p>{description}</p>
        </div>
        
        <GameImage imagePath={imagePath} altDescription={word} />
        <NextButton />

      </main>
    </>
  );
};

export default Slides;
