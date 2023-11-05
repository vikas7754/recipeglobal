import { createSlice } from "@reduxjs/toolkit";

export const theme = createSlice({
  name: "theme",
  initialState: {
    isDark: true,
  },
  reducers: {
    toggleTheme: (state) => {
      if (state.isDark) {
        document.body.classList.add("light");
        document.body.classList.remove("dark");
      } else {
        document.body.classList.remove("light");
        document.body.classList.add("dark");
      }
      state.isDark = !state.isDark;
    },
  },
});

export const { toggleTheme } = theme.actions;
export default theme.reducer;
