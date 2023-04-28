// scoreHelper.ts
export const getUserScore = (): number => {
  const score = localStorage.getItem("userScore");
  return score ? parseInt(score, 10) : 0;
};

export const setUserScore = (newScore: number): void => {
  localStorage.setItem("userScore", newScore.toString());
};

export const updateUserScore = (points: number): void => {
  const currentScore = getUserScore();
  const newScore = currentScore + points;
  setUserScore(newScore);
};
