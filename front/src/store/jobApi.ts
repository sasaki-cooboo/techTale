import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getApiPath } from "@/libs/fetch";
import { JobListResponse, JobType } from "@/features/jobs/job.type";

export const jobApi = createApi({
  reducerPath: "jobApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${getApiPath()}/api/v1/` }),
  endpoints: (builder) => ({
    getJobList: builder.query<JobListResponse, void>({
      query: () => `jobs`,
    }),
    getJobDetail: builder.query<JobType, number>({
      query: (id) => `job/${id}`,
    }),
  }),
});

export const { useGetJobListQuery, useGetJobDetailQuery } = jobApi;
