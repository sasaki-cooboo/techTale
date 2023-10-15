// store.js
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { JobListState, JobType } from "./job.type";

const initialState: JobListState = {
  jobList: [],
  totalCount: 0,
};

export const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setJobList: (state, action: PayloadAction<JobType[]>) => {
      state.jobList = action.payload;
    },
    // removeJob: (state, action) => {
    //   return state.filter((job) => job.id !== action.payload.id);
    // },
  },
});

export const { setJobList } = jobsSlice.actions;
