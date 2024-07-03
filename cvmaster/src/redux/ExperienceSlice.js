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
    updateExperience: (state, action) => {},
  },
});

export const { updateExperience } = experienceSlice.actions;
export default experienceSlice.reducer;
