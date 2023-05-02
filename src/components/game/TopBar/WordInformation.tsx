import React, { useState, useEffect } from "react";

interface WordInformationProps {
  isDrawing: boolean;
  word: string;
  time: number;
}

const WordInformation: React.FC<WordInformationProps> = ({
  isDrawing,
  word,
  time,
}) => {
  const [partialWord, setPartialWord] = useState("");
  const [revealedIndices, setRevealedIndices] = useState(new Set<number>());

  useEffect(() => {
    if (!isDrawing) {
      const revealFrequency = 60 / Math.ceil(word.length / 3); // Calculate the reveal frequency
      const revealCount = Math.floor((60 - time) / revealFrequency); // Calculate the number of characters to reveal based on the time

      let newRevealedIndices = new Set<number>(revealedIndices);

      while (newRevealedIndices.size < revealCount) {
        const index = Math.floor(Math.random() * word.length);
        if (word[index] !== " ") {
          newRevealedIndices.add(index);
        }
      }

      setRevealedIndices(newRevealedIndices);

      setPartialWord(
        word
          .split("")
          .map((char, index) =>
            char === " " ? "\u00A0\u00A0" : newRevealedIndices.has(index) ? char : "_"
          )
          .join("\u00A0")
      );
    }
  }, [isDrawing, word, time, revealedIndices]);

  const displayText = isDrawing
    ? `You are drawing: ${word}`
    : `Guess the word: ${partialWord}`;

  return (
    <div style={{ fontSize: "24px", marginBottom: "10px" }}>{displayText}</div>
  );
};

export default WordInformation;
