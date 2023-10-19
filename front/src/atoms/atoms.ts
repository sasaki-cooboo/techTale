import { JobConditionType, JobListResponse } from "@/features/jobs/job.type";
import { atom } from "jotai";

export const jobAtom = atom<JobListResponse | null>(null);

export const loadingAtom = atom<boolean>(false);

export const initialJobCondition = {
  areas: [],
  languages: [],
  features: [],
  skills: [],
  engineerTypes: [],
};

export const jobConditionAtom = atom<JobConditionType>(initialJobCondition);

export const MENU_LIST = ["関連度順", "新着順", "高単価順"] as const;
export const jobSortAtom = atom<(typeof MENU_LIST)[number]>(MENU_LIST[0]);
