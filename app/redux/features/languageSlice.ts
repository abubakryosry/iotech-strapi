import { createSlice } from "@reduxjs/toolkit";

export type LanguageState = {
  language: string;
};

const initialState: LanguageState = {
  language: "en", 
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
