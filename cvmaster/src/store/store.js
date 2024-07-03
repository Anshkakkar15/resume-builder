import { configureStore } from "@reduxjs/toolkit";
import IntroductionSlice from "@/redux/IntroductionSlice";
import SummarySlice from "@/redux/SummarySlice";
import LanguageSlice from "@/redux/LanguageSlice";
import ExperienceSlice from "@/redux/ExperienceSlice";

export const store = configureStore({
  reducer: {
    IntroductionSlice,
    SummarySlice,
    LanguageSlice,
    ExperienceSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
