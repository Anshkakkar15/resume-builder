import { createSlice } from "@reduxjs/toolkit";

export const experienctState = {
  jobTitle: "",
  employer: "",
  city: "",
  country: "",
  startDate: "",
  endDate: "",
  responsibilities: "",
  present: false,
};

const experienceFields = [experienctState];

const initialState = {
  experienceFields: experienceFields,
  index: experienceFields.length - 1,
};

const experienceSlice = createSlice({
  name: "experience",
  initialState,
  reducers: {
    updateExperience: (state, action) => {
      const { index, value } = action.payload;
      const updatedExperienceFields = [...state.experienceFields];
      updatedExperienceFields[index] = {
        ...updatedExperienceFields[index],
        ...value,
      };
      state.experienceFields = updatedExperienceFields;
    },

    addExperience: (state) => {
      state.experienceFields.push(experienctState);
      state.index++;
    },

    setExperienceField: (state, action) => {
      const { index, data } = action.payload;
      state.experienceFields[index] = data;
    },
  },
});

export const { updateExperience, setExperienceField, addExperience } =
  experienceSlice.actions;
export default experienceSlice.reducer;
