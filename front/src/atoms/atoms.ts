import { JobListResponse } from "@/features/jobs/job.type";
import { atom } from "jotai";

export const jobAtom = atom<JobListResponse | null>(null);

export const loadingAtom = atom<boolean>(false);
