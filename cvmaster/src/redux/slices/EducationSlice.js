import { createSlice } from "@reduxjs/toolkit";

export const educationState = {
  instituteName: "",
  degree: "",
  instituteLocation: "",
  graduationMonth: "",
  graduationYear: "",
};

const educationFields = [educationState];

const initialState = {
  educationFields: educationFields,
  index: 0,
};

const educationSlice = createSlice({
  name: "education",
  initialState,
  reducers: {
    updateEducation: (state, action) => {
      const { index, value } = action.payload;
      const updatedEducationFields = [...state.educationFields];
      updatedEducationFields[index] = {
        ...updatedEducationFields[index],
        ...value,
      };

      state.educationFields = updatedEducationFields;
    },

    addEducation: (state) => {
      state.educationFields.push(educationState);
      state.index++;
    },

    setEducationField: (state, action) => {
      state.educationFields = action.payload;
    },

    updateEducationIndex: (state, action) => {
      state.index = action.payload;
    },
  },
});

export const {
  updateEducation,
  addEducation,
  setEducationField,
  updateEducationIndex,
} = educationSlice.actions;

export default educationSlice.reducer;
