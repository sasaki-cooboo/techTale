import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getApiPath } from "@/libs/fetch";
import { JobListResponse } from "@/features/jobs/job.type";

export const jobApi = createApi({
  reducerPath: "jobApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${getApiPath()}/api/v1/` }),
  endpoints: (builder) => ({
    getJobList: builder.query<JobListResponse, void>({
      query: () => `jobs`,
    }),
  }),
});

export const { useGetJobListQuery } = jobApi;
