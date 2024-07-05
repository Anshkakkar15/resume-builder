// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   language: [{ language: "" }],
// };

// const languageSlice = createSlice({
//   name: "language",
//   initialState,
//   reducers: {
//     updateLanguage: (state, action) => {
//       const { index, value } = action.payload;
//       state.language[index].language = value;
//     },
//     addLanguage: (state) => {
//       state.language.push({ language: "" });
//     },
//   },
// });

// export const { updateLanguage, addLanguage } = languageSlice.actions;
// export default languageSlice.reducer;

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
      if (index >= 0 && index < state.language.length) {
        state.language[index].language = value;
      }
    },
    addLanguage: (state) => {
      state.language.push({ language: "" });
    },
    setLanguages: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { updateLanguage, addLanguage, setLanguages } =
  languageSlice.actions;
export default languageSlice.reducer;
