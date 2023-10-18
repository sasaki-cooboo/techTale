import { JobListResponse } from "@/features/jobs/job.type";
import { atom } from "jotai";

export const jobAtom = atom<JobListResponse>({
  jobList: [],
  meta: {
    count: 0,
  },
});

export const loadingAtom = atom<boolean>(false);
