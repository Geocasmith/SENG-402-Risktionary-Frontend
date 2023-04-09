import { configureStore, createSlice } from "@reduxjs/toolkit";
import gameReducer from './reducers/gameSlice';


const voteSlice = createSlice({
  name: "vote",
  initialState: {
    name: "Bus Factors",
  },
  reducers: {
    // Add any reducers if needed
  },
});

export const store = configureStore({
  reducer: {
    // Add the vote slice to the rootReducer
    vote: voteSlice.reducer,
    game: gameReducer,
  },
});

// Define the RootState type
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


// Export the selector to get the name from the state
export const selectVoteName = (state: RootState) => state.vote.name;
