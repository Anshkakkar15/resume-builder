import { configureStore } from "@reduxjs/toolkit";
import IntroductionSlice from "@/redux/slices/IntroductionSlice";
import SummarySlice from "@/redux/slices/SummarySlice";
import LanguageSlice from "@/redux/slices/LanguageSlice";
import ExperienceSlice from "@/redux/slices/ExperienceSlice";
import AuthSlice from "@/redux/slices/AuthSlice";
import { api } from "@/redux/api";

export const store = configureStore({
  reducer: {
    IntroductionSlice,
    SummarySlice,
    LanguageSlice,
    ExperienceSlice,
    AuthSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(api.middleware),
});
