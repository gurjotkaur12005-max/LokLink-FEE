import { createSlice } from "@reduxjs/toolkit";
import { readJSON, KEYS } from "../services/storage";

// State: a list of saved scheme IDs. We start from localStorage so saves survive a refresh.
const initialState = {
  ids: readJSON(KEYS.saved, []),
};

const savedSchemesSlice = createSlice({
  name: "savedSchemes",
  initialState,
  reducers: {
    // Redux Toolkit lets us "mutate" state here (it uses Immer behind the scenes)
    addSavedScheme(state, action) {
      if (!state.ids.includes(action.payload)) {
        state.ids.push(action.payload);
      }
    },
    removeSavedScheme(state, action) {
      state.ids = state.ids.filter((id) => id !== action.payload);
    },
  },
});

export const { addSavedScheme, removeSavedScheme } = savedSchemesSlice.actions;
export default savedSchemesSlice.reducer;
