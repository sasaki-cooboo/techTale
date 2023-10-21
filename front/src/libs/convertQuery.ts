/**
 * クエリパラメータ作成関数
 * @param Record obj obj
 * @returns string
 */
export function convertObjectToQueryString(
  obj: Record<string, number[]>
): string {
  const queryParams = [];
  for (const key in obj) {
    if (obj[key].length > 0) {
      queryParams.push(`${key}=${obj[key].join(",")}`);
    }
  }
  return `?${queryParams.join("&")}`;
}
/**
 * クエリパラメータからconditionオブジェクトに変換する関数
 * @param string　string
 * @returns Record
 */
export function convertQueryStringToObject(
  queryString: string
): Record<string, number[]> {
  const obj: Record<string, number[]> = {};
  const queryParameters = new URLSearchParams(queryString);

  queryParameters.forEach((value, key) => {
    if (key !== "sort" && key !== "q") {
      // ソートとキーワード検索は別管理
      const values = value.split(",").map(Number); // カンマ区切りの値を数値の配列に変換
      obj[key] = values;
    }
  });

  return obj;
}
