import React from "react";

interface WordInformationProps {
  isDrawing: boolean;
  word: string;
}

const WordInformation: React.FC<WordInformationProps> = ({
  isDrawing,
  word,
}) => {
  const maskedWord = isDrawing
    ? word
    : word
        .split("")
        .map((char) => (char === " " ? " ‎‎‎    " : "_ "))
        .join("");

  const displayText = isDrawing
    ? `You are drawing: ${word}`
    : `Guess the word: ${maskedWord}`;

  return (
    <div style={{ fontSize: "24px", marginBottom: "10px" }}>{displayText}</div>
  );
};

export default WordInformation;
