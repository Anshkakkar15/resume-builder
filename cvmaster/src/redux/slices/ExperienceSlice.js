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
  index: 0,
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
      state.experienceFields = action.payload;
    },
    updateIndex: (state, action) => {
      state.index = action.payload;
    },
  },
});

export const {
  updateExperience,
  setExperienceField,
  addExperience,
  updateIndex,
} = experienceSlice.actions;

export default experienceSlice.reducer;
