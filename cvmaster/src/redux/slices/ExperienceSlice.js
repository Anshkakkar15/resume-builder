import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formState: {
    jobTitle: "",
    employer: "",
    city: "",
    country: "",
    startDate: "",
    endDate: "",
    responsibilities: "",
    present: false,
  },
  educationList: [],
};

const experienceSlice = createSlice({
  name: "education",
  initialState,
  reducers: {
    updateExperience: (state, action) => {
      return { ...state.formState, ...action.payload };
    },
  },
});

export const { updateExperience } = experienceSlice.actions;
export default experienceSlice.reducer;
