import { configureStore } from "@reduxjs/toolkit";
import IntroductionSlice from "@/redux/IntroductionSlice";

export const store = configureStore({
  reducer: {
    IntroductionSlice,
  },
});
