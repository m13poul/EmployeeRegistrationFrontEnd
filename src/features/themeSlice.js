import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  dark: "light",
};

const themeSlice = createSlice({
  name: "themeSlice",
  initialState,
  reducers: {
    setDarkTheme(state, action) {
      state.dark = action.payload;
      // console.log("state", current(state), state.dark);
    },
  },
});

export const { setDarkTheme } = themeSlice.actions;
export default themeSlice.reducer;
