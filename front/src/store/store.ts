import { jobsSlice } from "@/features/jobs/JobSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: jobsSlice.reducer,
});

export default store;
