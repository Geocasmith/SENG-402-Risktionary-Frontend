// usePartialWord.ts
import { useState, useEffect } from "react";

export const usePartialWord = (
  word: string,
  isDrawing: boolean,
  revealProgress: number
) => {
  const [partialWord, setPartialWord] = useState("");
  const [revealedIndices, setRevealedIndices] = useState(new Set<number>());

  useEffect(() => {
    if (!isDrawing) {
      const totalRevealedChars = Math.floor(word.length * revealProgress);
      let newRevealedIndices = new Set<number>(revealedIndices);

      while (newRevealedIndices.size < totalRevealedChars) {
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
            newRevealedIndices.has(index) || char === " " ? char : "_"
          )
          .join(" ")
      );
    }
  }, [isDrawing, word, revealProgress, revealedIndices]);

  return partialWord;
};
