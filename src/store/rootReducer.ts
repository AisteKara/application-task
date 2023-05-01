import { combineReducers } from "@reduxjs/toolkit";
import filmsReducer from "./filmsSlice"

const rootReducer = combineReducers({
  films: filmsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
