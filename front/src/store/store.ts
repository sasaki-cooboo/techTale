import { jobApi } from "@/store/job";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    [jobApi.reducerPath]: jobApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jobApi.middleware),
});

export default store;
