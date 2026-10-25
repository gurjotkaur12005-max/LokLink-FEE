import { configureStore } from "@reduxjs/toolkit";
import savedSchemesReducer from "./savedSchemesSlice";
import { writeJSON, KEYS } from "../services/storage";

export const store = configureStore({
  reducer: {
    savedSchemes: savedSchemesReducer,
  },
});

// Every time the store changes, copy the saved IDs to localStorage
store.subscribe(() => {
  writeJSON(KEYS.saved, store.getState().savedSchemes.ids);
});
