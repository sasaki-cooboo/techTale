import fetch from "@/libs/fetch";
import { JobAttributesType, JobListResponse } from "./job.type";
import { convertQueryStringToObject } from "@/libs/convertQuery";
import { MENU_LIST, initialJobCondition } from "@/atoms/atoms";
import { ParsedUrlQuery } from "querystring";

/**
 * 初期表示用データ取得関数
 */
export const init = async (query: ParsedUrlQuery) => {
  try {
    const queryParams = Object.keys(query)
      .map((key) => `${key}=${query[key]}`)
      .join("&");

    // 属性取得
    const { data: jobAttributes } = await fetch.get<JobAttributesType>(
      `/api/v1/jobAttributes`
    );

    // 求人取得
    const { data: jobs } = await fetch.get<JobListResponse>(
      `/api/v1/jobs?${queryParams}`
    );

    // ブックマーク取得、セッション使用のためclientから取得する
    const { data: bookmarkIds } = await fetch.get<number[]>(
      `/api/v1/jobBookmark`
    );

    // 絞り込み条件を作成
    const condition = {
      ...initialJobCondition,
      ...convertQueryStringToObject(queryParams),
    };

    const sort =
      query.sort === "latest"
        ? MENU_LIST[1]
        : query.sort === "cost"
        ? MENU_LIST[2]
        : MENU_LIST[0];

    return {
      jobAttributes,
      jobs,
      condition,
      bookmarkIds,
      sort,
      q: query.q || "",
    };
  } catch (error) {
    return false;
  }
};
