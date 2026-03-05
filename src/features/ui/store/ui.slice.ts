import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UiState = {
  activeMeTab: "overview" | "posts" | "likes" | "saved" | "settings";
};

const initialState: UiState = {
  activeMeTab: "overview",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setActiveMeTab: (state, action: PayloadAction<UiState["activeMeTab"]>) => {
      state.activeMeTab = action.payload;
    },
  },
});

export const { setActiveMeTab } = uiSlice.actions;
export default uiSlice.reducer;