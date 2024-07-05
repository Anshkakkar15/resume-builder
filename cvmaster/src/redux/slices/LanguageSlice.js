import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  language: [{ language: "" }],
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    updateLanguage: (state, action) => {
      const { index, value } = action.payload;
      state.language[index].language = value;
    },
    addLanguage: (state) => {
      state.language.push({ language: "" });
    },
    setLanguages: (state, action) => {
      state.language = action.payload;
    },
    removeLanguage: (state, action) => {
      state.language.splice(action.payload, 1);
    },
  },
});

export const { updateLanguage, addLanguage, setLanguages, removeLanguage } =
  languageSlice.actions;
export default languageSlice.reducer;
