import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  skills: [{ language: "" }],
};

const skillsSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {
    updateSkills: (state, action) => {
      const { index, value } = action.payload;
      state.skills[index].language = value;
    },
    addSkills: (state) => {
      state.skills.push({ language: "" });
    },
    setSkills: (state, action) => {
      state.skills = action.payload;
    },
    removeSkills: (state, action) => {
      state.skills.splice(action.payload, 1);
    },
  },
});

export const { updateSkills, addSkills, setSkills, removeSkills } =
  skillsSlice.actions;
export default skillsSlice.reducer;
