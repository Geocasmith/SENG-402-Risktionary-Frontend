// src/store/gameSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

interface GameState {
  gamePhase: string;
}

const initialState: GameState = {
  gamePhase: "lobby",
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
