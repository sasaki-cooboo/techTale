import { jobApi } from "@/store/jobApi";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    [jobApi.reducerPath]: jobApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jobApi.middleware),
});

export default store;
