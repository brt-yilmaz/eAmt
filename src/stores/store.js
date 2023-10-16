import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

export function createStore(preloadedState = {}) {
  return configureStore({
    reducer: {
      user: userReducer,
    },
    preloadedState,
  });
}

export const store = createStore({});
