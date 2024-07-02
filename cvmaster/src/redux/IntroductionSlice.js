import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstName: "",
  lastName: "",
  jobTitle: "",
  email: "",
  phone: "",
  address: "",
};

export const introductionSlice = createSlice({
  name: "introduction",
  initialState,
  reducers: {
    updateIntroduction: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateIntroduction } = introductionSlice.actions;
export default introductionSlice.reducer;
