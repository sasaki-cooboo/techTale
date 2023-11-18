import fetch from "@/libs/fetch";
import { JobDetailResponse } from "../job.type";

/**
 * 初期表示用データ取得関数:詳細ページ
 */
export const init = async (id: string) => {
  try {
    // 求人取得
    const { data: job } = await fetch.get<JobDetailResponse>(
      `/api/v1/job/${id}`
    );

    // ブックマーク取得、セッション使用のためclientから取得する
    const { data: bookmarkIds } = await fetch.get<number[]>(
      `/api/v1/jobBookmarkIds`
    );

    return {
      job,
      bookmarkIds,
    };
  } catch (error) {
    return false;
  }
};
