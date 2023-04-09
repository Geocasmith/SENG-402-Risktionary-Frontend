// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./gameSlice";


export const store = configureStore({
  reducer: {
    game: gameReducer,
    // Add other reducers here
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
