import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  dark: localStorage.getItem("current-theme") ? "dark" : "light",
};

const themeSlice = createSlice({
  name: "themeSlice",
  initialState,
  reducers: {
    setDarkTheme(state, action) {
      state.dark = action.payload;
      state.dark === "dark"
        ? localStorage.setItem("current-theme", "dark")
        : localStorage.removeItem("current-theme");
    },
  },
});

export const { setDarkTheme } = themeSlice.actions;
export default themeSlice.reducer;
