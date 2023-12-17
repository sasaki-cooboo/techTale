import {
  JobAttributesType,
  JobConditionType,
  JobDetailResponse,
  JobListResponse,
} from "@/features/jobs/job.type";
import { atom } from "jotai";

export const jobAtom = atom<JobListResponse | null>(null);
export const jobDetailAtom = atom<JobDetailResponse | null>(null);

export const loadingAtom = atom<boolean>(false);

export const initialJobCondition = {
  areas: [],
  languages: [],
  features: [],
  skills: [],
  engineerTypes: [],
};

export const jobConditionAtom = atom<JobConditionType>(initialJobCondition);

// 検索条件表示に使うatom、検索時のみ更新かける、urlパラメータ使えばいらなかったかも？
export const jobConditionDisplayAtom =
  atom<JobConditionType>(initialJobCondition);

export const MENU_LIST = ["関連度順", "新着順", "高単価順"] as const;
export const jobSortAtom = atom<(typeof MENU_LIST)[number]>(MENU_LIST[0]);

export const jobAttributesAtom = atom<JobAttributesType>({
  areas: [],
  languages: [],
  features: [],
  skills: {
    frameworks: [],
    databases: [],
    clouds: [],
  },
  engineerTypes: [],
});

// この条件に一致する案件数
export const jobTotalCountAtom = atom<number>(0);

// キーワード保持用
export const jobSearchKeywordAtom = atom<string>("");

// ブックマーク
// id保持用（全て）
export const jobBookmarkIdsAtom = atom<number[]>([]);

const initialState: JobListResponse = {
  jobList: [],
  meta: {
    per_page: 0,
    current_page: 0,
    total: 0,
    from: 0,
    to: 0,
  },
};

// 表示用、ページネーションで分割されている
export const jobBookmarkAtom = atom<JobListResponse | null>(initialState);
