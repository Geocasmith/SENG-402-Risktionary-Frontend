// src/store/gameSlice.ts

import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

export enum GamePhase {
  Lobby = "lobby",
  Game = "game",
  Vote = "vote",
  DisplayVotes = "displayVotes", // Add this line
  Slides = "slides",
}

interface GameState {
  gamePhase: GamePhase;
}

const initialState: GameState = {
  gamePhase: GamePhase.Lobby,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGamePhase: (state, action) => {
      state.gamePhase = action.payload;
    },
  },
});

export const { setGamePhase } = gameSlice.actions;

export const selectGamePhase = (state: RootState) => state.game.gamePhase;

export default gameSlice.reducer;
