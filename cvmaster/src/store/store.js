import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "@/redux/slices/AuthSlice";
import IntroductionSlice from "@/redux/slices/IntroductionSlice";
import SummarySlice from "@/redux/slices/SummarySlice";
import LanguageSlice from "@/redux/slices/LanguageSlice";
import ExperienceSlice from "@/redux/slices/ExperienceSlice";
import SkillsSlice from "@/redux/slices/SkillsSlice";
import { api } from "@/redux/api";

export const store = configureStore({
  reducer: {
    AuthSlice,
    IntroductionSlice,
    SummarySlice,
    LanguageSlice,
    ExperienceSlice,
    SkillsSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(api.middleware),
});
